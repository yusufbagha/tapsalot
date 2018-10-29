import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'

// refactor server code
  // split into different files under /imports/api

const Taps = new Mongo.Collection('taps');
const Counter = new Mongo.Collection('counter');

Meteor.startup(() => {
  // Methods
  Meteor.methods({
    // Inserts Taps
    'tap.insert'() {
      let insertTap = () => {
        let tapObj = {
          userId: this.userId,
          date: new Date()
        }

        Taps.insert(tapObj);
      }

      // Insert Tap If Logged In
      if (this.userId) {
        insertTap();
      }
    },
    // Updates Username
    'username.update'(newUsername) {
      Accounts.setUsername(this.userId, newUsername)
    }
  });

  // Publications
  // Number Of Global Taps
  Meteor.publish('taps.count', function tapsPublication() {
    return Counter.find();
  });

  // Number Of User Contributions
  Meteor.publish('contributions.count', function contributionPublication() {
    return Taps.find({userId: this.userId});
  });

  // Number Of Users Currently Online
  Meteor.publish("users.online", function() {
    return Meteor.users.find({ "status.online": true });
  });

  // Delayed Counter
  if (Counter.find({}).count() == 0) {
    let obj = {
      name: 'delayedCounter',
      value: 0
    }
    Counter.insert(obj)
  }

  Meteor.setInterval(() => {
    let value = Taps.find({}).count();
    Counter.update(
      { name: 'delayedCounter' },
      { $set:
        {
          value: value,
        }
      }
  )
  }, 2)


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
  let contributionsCountRule = createRule('publish', 'contributions.count');

  DDPRateLimiter.addRule(tapInsertRule, 8, 1000);
  DDPRateLimiter.addRule(usernameUpdateRule, 1, 1000);
  DDPRateLimiter.addRule(contributionsCountRule, 8, 1000);


  // Indexes
  Taps.rawCollection().createIndex({ userId: 1 });
});


// Notes

/*

  # Refactor server code

  # Figure out how to publish number of users currently online without sending user document to client

  # Limit methods and subsciptions for non logged in users

  # Identify scripting users and do something naughty


  ### Future Features 

  # Social

  # Analytics

*/