import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes';

Meteor.startup(() => {

  // refactor and seperate into component
    // quick code : bad way to attach global event listener : cleanup
  document.getElementById('react-target').addEventListener('click', () => {
    // returns random 10 character string
    let randomStr = (times) => {
      let str = '';
      for (let i = 0; i < times; i++) {
        str += String(Math.random().toString(36).slice(-10));
      }
      
      return str;
    }

    // generating username on client -- 'Account.createUser()' is a client method
    let generateUsername = () => {
      // write better username generator
      return randomStr(1);
    }

    // creates user account
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

    // inserts tap &OR creates user
    if (!Meteor.user()) {
      createUser();
      Meteor.call('tap.insert');
    } else {
      Meteor.call('tap.insert');
    }
  });
  
  render(renderRoutes(), document.getElementById('react-target'));
});