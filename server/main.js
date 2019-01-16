import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import { HTTP } from 'meteor/http'
import { Session } from 'meteor/session'
import { Accounts } from 'meteor/accounts-base'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'

// refactor server code
  // split into different files under /imports/api

const Taps = new Mongo.Collection('taps');
const Counter = new Mongo.Collection('counter');
const Messages = new Mongo.Collection('messages');
const Usernames = new Mongo.Collection('usernames');


Meteor.startup(() => {
  // Methods
  Meteor.methods({
    // Inserts Taps
    'tap.insert'() {
      let insertTap = () => {
        let tapObj = {
          userId: this.userId,
          date: new Date(),
          ip: this.connection.clientAddress,
        }

        Taps.insert(tapObj);

        let contributions = Number(Meteor.user().profile.contributions);
        let newContribution = contributions + 1;

        // Anti Cheating
        let antiCheating = () => {
          if (contributions > 100) {
            // DDPRate Limit is 10 per second
            console.log('checked')
            let taps = Taps.findOne({userId : this.userId}, {sort : {date: -1}, skip : 99});
            let now = Date.now();
            let then = taps.date.getTime();
            let difference = now - then;

            console.log(difference)
    
            if (difference < 10100) { 
              Meteor.users.update({_id: Meteor.user()._id}, { $set: {'profile.contributions' : 0}});
              Meteor.users.update(Meteor.user()._id, { $set: {"services.resume.loginTokens": []}});
              Taps.remove({userId: this.userId});
              newContribution = 0;
            }
          }
        }

        if (contributions % 10 == 0) {
          antiCheating();
        }

        if (contributions) {
          Meteor.users.update({_id: Meteor.user()._id}, { $set: {'profile.contributions' : newContribution}});
        } else {
          // first time tap initialize
          if (Meteor.user().username.length >= 10) {
            Accounts.setUsername(this.userId, String(Math.random().toString(36).slice(-10)));
          }
          Meteor.users.update({_id: Meteor.user()._id}, { $set: {'profile.contributions' : 1}});
        }
      }
      
      // Insert Tap If Logged In
      if (this.userId) {
        insertTap();
      }
    },
    // Updates Username
    'username.update'(newUsername) {
      check(newUsername, String);
      if (3 < newUsername.length <= 10 ) {
        let username = newUsername.toLowerCase();
        Accounts.setUsername(this.userId, username)
      }
    },
    'message.insert'(message) {
      check(message, String);

      if (1 < message.length <= 150 ) {

      }

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

  // Publications
  // Number Of Global Taps
  Meteor.publish('taps.count', function tapsPublication() {
    return Counter.find();
  });

  // // Number Of User Contributions
  // Meteor.publish('contributions.count', function contributionPublication() {
  //   return Taps.find({userId: this.userId});
  // });

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

  // Delayed Counter
  // Delayed Counter Limits Client Counter Updates 
    // Might be a good idea to make this a microservice
  if (Counter.find({}).count() == 0) {
    let obj = {
      name: 'delayedCounter',
      value: 0
    }
    Counter.insert(obj)
  }

  Meteor.setInterval(() => {
    let value = Taps.find({}).count();
    let counterValue = Counter.find({name : 'delayedCounter'});

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


  // Limit Rules
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
  // let tapsCountRule = createRule('publish', 'taps.count');

  DDPRateLimiter.addRule(tapInsertRule, 10, 1000);
  DDPRateLimiter.addRule(usernameUpdateRule, 1, 1000);
  DDPRateLimiter.addRule(messageInsertRule, 1, 2000);
  // DDPRateLimiter.addRule(tapsCountRule, 1, 1000);

  Meteor.users.deny({
    update() { return true; }
  });


  // Indexes
  Taps.rawCollection().createIndex({ userId: 1 });
});


// DDPRate Limiter On Taps Count Publication 1 per 100ms instead of delayed counter


// Notes

/*

  # Refactor server code

  # Figure out how to publish number of users currently online without sending user document to client

  # Limit methods and subsciptions for non logged in users

  # Identify scripting users and do something naughty


  ### Future Features 

  # Social

  # Analytics

  ### UI Updates

  # Stop text highlight while clicking
  # Stop Zooming on iOS while clicking


  Tasks

  - Fix Chat Design DONE
  
  - Chat loading

  - Add leaderboards

  - make messages cost CC


  - Add limit for messages and limit for usernames

  - Add error handling
    - too many requests
    - not enough credits
    - username not long enough or too long
    - message too long or not long enough
  
  - add checks tap method and others

  - add scripting check

  - profile modal






  - chat loading

  - fix mobile styles & swal styles & remove unnecessary styles

  - fix grammer (1 contribution vs 5 contributions)

  - better name generator*

  - add randomness

  - react scroll to top

*/



/*

Randomness

Global Randomness
- Things happen at random numbers

Local Randomness
- Things happen when local counter reaches random numbers

Random Randomness
- Things happen randomly


LIST OF THINGS
- Random Images When Opening Modals

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
