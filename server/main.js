import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

// import Links from '/imports/api/links';
import '/imports/api/home/taps';
import '/imports/api/home/header';
// import Links from '/imports/api/home/leaderboard';
// import Links from '/imports/api/home/chat';


Meteor.startup(() => {
  Accounts.config({
    forbidClientAccountCreation: false
  });
  
  // Accounts.onCreateUser(function(options, user) {
  //   if (! validateEmail(options.email))
  //     throw new Meteor.Error(400, 'There was an error processing your request');

  //   user.profileComplete = options.profileComplete;
  //   return user;
  // });

    

  
});


// Features That Show Up Later

/*

Daily Analytics Available To Users
-- Daily Clicks
-- Daily Users
-- Etc

Social Feature At Bottom on arrow button click

*/
