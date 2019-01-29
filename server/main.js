import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import { HTTP } from 'meteor/http'
import { Accounts } from 'meteor/accounts-base'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'

// seperate server code into different files under /imports/api

// Mongo Declarations
import { Taps, Counter, Messages } from '../imports/api/collections';

Meteor.startup(() => {
/*_______________________________________________________________________________________________________________________________________________________*/
  
  // Methods
  Meteor.methods({
    'tap.insert'() {
      let contributions = Number(Meteor.user().profile.contributions);
      let newContribution = contributions + 1;

      let antiCheating = () => {
        if (contributions > 100) {
          // DDPRate Limit is 10 per second
          let oldTap = Taps.findOne({userId : this.userId}, {sort : {date: -1}, skip : 99});
          let now = Date.now();
          let then = oldTap.date.getTime();
          let difference = now - then;
          
          console.log(difference)
          // if difference between current time and oldTap time is less then 10.5s user has been hitting the DDPRate limit for 10 seconds
            // likely a cheater
          if (difference < 10500) { 
            Meteor.users.update({_id: Meteor.user()._id}, { $set: {'profile.contributions' : 0}});
            Taps.remove({userId: this.userId});
            newContribution = contributions - (contributions * 2);
          }
        }
      }

      let insertTap = () => {
        // add tapObj to Taps
        let tapObj = {
          userId: this.userId,
          date: new Date(),
          ip: this.connection.clientAddress,
        }

        Taps.insert(tapObj);

        // invoke anti cheating every 10th contribition
        if (contributions % 10 == 0) {
          antiCheating();
        }

        // increment user contributions
        if (contributions) {
          Meteor.users.update({_id: Meteor.user()._id}, { $set: {'profile.contributions' : newContribution}});
        } else {
          // tap initialization
            // checking if length is below 10 : Account.createUser() is a client method  
          if (Meteor.user().username.length >= 10) {
            // random string not ideal
            Accounts.setUsername(this.userId, String(Math.random().toString(36).slice(-10)));
          }
          Meteor.users.update({_id: Meteor.user()._id}, { $set: {'profile.contributions' : 1}});
        }
      }
      
      // insert tap if logged in
      if (this.userId) {
        insertTap();
      }
    },
    'username.update'(newUsername) {
      check(newUsername, String);
      let length = newUsername.length;

      if (length > 3 && length <= 10) {
        let username = newUsername.toLowerCase();
        Accounts.setUsername(this.userId, username)
      }
    },
    'message.insert'(message) {
      check(message, String);
      let length = message.length;

      if (length > 1 && length <= 150) {
        let messageObj = {
          userId: this.userId,
          message: message,
          date: new Date(),
          ip: this.connection.clientAddress,
        }

        let contributions = Meteor.user().profile.contributions;
        let newContribution = Number(contributions) - 25;

        if (contributions >= 25) {
          Meteor.users.update({_id: Meteor.user()._id}, { $set: {'profile.contributions' : newContribution}});
          Messages.insert(messageObj)
        } else {
          throw new Meteor.Error('error', "Not enough contributions. You need 25 to send a message. You can earn more by clicking");        
        }
      }
    },
    'gif.get'() {
      let result = HTTP.call('GET', 'https://api.giphy.com/v1/gifs/random', {
        data: { 
          api_key : 'JV5ojFZAjMYai9rQLlA7xOOXaWsVjHr3',
          tag: 'meme',
          fmt: 'json', 
        }
      });

      return result;
    },
  });

/*_______________________________________________________________________________________________________________________________________________________*/

  // Publications
  // Number Of Global Taps
  Meteor.publish('taps.count', function tapsPublication() {
    return Counter.find();
  });

  // Number Of Users Currently Online
  Meteor.publish("users.online", function() {
    return Meteor.users.find({ "status.online": true }, {
      fields: { 
        username: 1,
        'status.online': 1,
      }
    });
  });

  // Messages
  Meteor.publish("public.messages", function() {
    return Messages.find({}, {
      fields: { 
        ip: 0,
      }
    });
  });

  // Usernames
  Meteor.publish("public.users", function() {
    return Meteor.users.find({}, {
      fields: { 
        username: 1,
        'profile.contributions' : 1,
      }
    });
  });

/*_______________________________________________________________________________________________________________________________________________________*/

  // Delayed Counter
    // non-ideal way to limit client counter updates 
      // each update made to mongo triggers an update on every client
      // limiting client updates to 50ms instead of every time mongo is updated : the latter creates a backlog of requests
      // might be a good idea to make this a microservice

  // initital setup
  if (Counter.find({}).count() == 0) {
    let obj = {
      name: 'delayedCounter',
      value: 0
    }
    Counter.insert(obj)
  }

  // brute : implement better solution asap
  Meteor.setInterval(() => {
    let value = Taps.find({}).count();
    let counterValue = Counter.find({name : 'delayedCounter'});

    // prevent unnecessary db updates
    if (value != counterValue ) {
      Counter.update(
        { name: 'delayedCounter' },
        { $set:
          {
            value: value,
          }
        }
      )
    }
  }, 50)

/*_______________________________________________________________________________________________________________________________________________________*/

  // Rate Limit Rules
  let createRule = (type, name) => {
    let ruleObj = {
      type: type,
      name: name,
      userId(userId) {
        if (userId) {
          return true;
        }
      }
    }

    return ruleObj;
  }

  let tapInsertRule = createRule('method', 'tap.insert');
  let usernameUpdateRule = createRule('method', 'username.update');
  let messageInsertRule = createRule('method', 'message.insert');

  DDPRateLimiter.addRule(tapInsertRule, 10, 1000);
  DDPRateLimiter.addRule(usernameUpdateRule, 1, 1000);
  DDPRateLimiter.addRule(messageInsertRule, 1, 1000);

  Meteor.users.deny({
    update() { return true; }
  });

/*_______________________________________________________________________________________________________________________________________________________*/

  // Indexes
  Taps.rawCollection().createIndex({ userId: 1 });
  Messages.rawCollection().createIndex({ date: -1 });
  Meteor.users.rawCollection().createIndex({ 'profile.contributions': -1 });

/*_______________________________________________________________________________________________________________________________________________________*/

});

/*

Randomness

Global Randomness
- Things happen at random numbers

Local Randomness
- Things happen when local counter reaches random numbers

Random Randomness
- Things happen randomly


Ideas

// Random Images When Opening Modals

// Rick roll open new tab

// Physics balls on screen

// Random images flying across the screen

// rockets

// confetti

// inverted colors or recolor the entire page

// sounds // quotes // robot voices

// Send things to users for contributions // play tts on user for 100 contributions // notification who sent // send meme

// different weather 

// Memes on screen

// when opening modal : audio plays, random. ex. you're fired

*/
