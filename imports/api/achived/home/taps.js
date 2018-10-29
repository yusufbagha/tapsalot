import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
  
const Taps = new Mongo.Collection('taps');
const Counter = new Mongo.Collection('counter');
 
// Methods
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

    // Insert Tap If Logged In
    if (this.userId) {
      insertTap();
    }
  },
  'username.update'(newUsername) {
    Accounts.setUsername(this.userId, newUsername)
  }
});

// Publications
Meteor.publish('taps.count', function tapsPublication() {
  return Counter.find();
});

Meteor.publish('contributions.count', function contributionPublication() {
  return Taps.find({userId: this.userId});
});

Meteor.publish("users.online", function() {
  return Meteor.users.find({ "status.online": true });
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


// Limit Rules
const limitTaps = {
  type: 'method',
  name: 'tap.insert',
  userId(userId) {
    if (userId) {
      return true;
    }
  }
};

const limitContributionSub = {
  type: 'publish',
  name: 'contributions.count',
  userId(userId) {
    if (userId) {
      return true;
    }
  }
};

const limitUsername = {
  type: 'method',
  name: 'username.update',
  userId(userId) {
    if (userId) {
      return true;
    }
  }
};

DDPRateLimiter.addRule(limitTaps, 8, 1000);
DDPRateLimiter.addRule(limitContributionSub, 8, 1000);
DDPRateLimiter.addRule(limitUsername, 1, 1000);


// Indexes
Taps.rawCollection().createIndex({ userId: 1 });







