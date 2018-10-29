import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
  
export const Taps = new Mongo.Collection('taps');
export const Counter = new Mongo.Collection('counter');
 
Meteor.methods({
  'tap.insert'() {
    // Inserts Tap Into Taps Collection
    let insertTap = () => {
      let tapObj = {
        userId: this.userId,
        date: new Date()
      }

      Taps.insert(tapObj);
    }

    // Insert Tap or Create User
    if (this.userId) {
      insertTap();
    }
  },
});

Meteor.publish('taps.count', function tapsPublication() {
  return Counter.find();
});

Meteor.publish('contributions.count', function contributionPublication() {
  return Taps.find({userId: this.userId});
});

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

const limitTaps = {
  type: 'method',
  name: 'tap.insert',
  userId(userId) {
    if (userId) {
      return true;
    }
  }
};
DDPRateLimiter.addRule(limitTaps, 8, 1000)

const limitContributionSub = {
  type: 'publish',
  name: 'contributions.count',
  userId(userId) {
    if (userId) {
      return true;
    }
  }
};
DDPRateLimiter.addRule(limitContributionSub, 8, 1000)

Meteor.publish("users.online", function() {
  return Meteor.users.find({ "status.online": true });
});

Taps.rawCollection().createIndex({ userId: 1 });


// Limit Subscription Updates | DONE

// Figure out how to publish numOfUsers without sending user data

// Show username if logged in & and allow username change, handle available username

// Todo

// Complete Username Change
// Refactor Code
// Push To git
// Email J & A

// Identify Scripting Users







