import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
  
// const Taps = new Mongo.Collection('taps');

// Meteor.publish('contributions.count', function contributionPublication() {
//   return Taps.find();
// });

// Meteor.methods({
//   'username.update'(newUsername) {
//     Accounts.setUsername(this.userId, newUsername)
//     // Handle error if username unavailable
//   }
// });

// const limitUsername = {
//   type: 'method',
//   name: 'username.update',
//   userId(userId) {
//     if (userId) {
//       return true;
//     }
//   }
// };
// DDPRateLimiter.addRule(limitUsername, 1, 1000)