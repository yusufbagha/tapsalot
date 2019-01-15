import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes';

Meteor.startup(() => {

  // import this
  document.getElementById('react-target').addEventListener('click', () => {
    // Returns Random 10 Character String
    let randomStr = (times) => {
      let str = '';
      for (let i = 0; i < times; i++) {
        str += String(Math.random().toString(36).slice(-10));
      }
      
      return str;
    }

    // Returns Random Username -- Generating Username On Client
    let generateUsername = () => {
      // Write Better Username Generator
      return randomStr(1);
    }

    // Creates User Account
    let createUser = () => {
      let userObj = {
        username: generateUsername(),
        email: randomStr(2),
        password: randomStr(1),
        profile: {
          createdAt: new Date()
        } 
      }

      Accounts.createUser(userObj);
    }

    // Inserts Tap &OR Creates User
    if (!Meteor.user()) {
      createUser();
      Meteor.call('tap.insert', 'hotfudge');
    } else {
      Meteor.call('tap.insert', 'hotfudge');
    }
  });
  
  render(renderRoutes(), document.getElementById('react-target'));
});