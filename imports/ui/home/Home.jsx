import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
// import { Header } from './header/Header';
// import { Taps } from './taps/Taps';
import { Leaderboard } from './leaderboard/Leaderboard';
import './Home.scss';

export default class Home extends Component {
  tap() {
    // Returns Random 10 Character String
    let randomStr = (times) => {
      let str = '';
      for (let i = 0; i < times; i++) {
         str += String(Math.random().toString(36).slice(-10));
      }
      
      return str;
    }

    // Returns Random Username
    let generateUsername = () => {
      // Write Better Username Generator
      return randomStr(2);
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
      Meteor.call('tap.insert');
    } else {
      Meteor.call('tap.insert');
    }
  }

  // home-wrapper Triggers tap() When Clicked
  render() {
    return (
      <div className="home-wrapper" onClick={() => this.tap()}>
        <div className="home-container">
          {/* <Header /> */}
          <div className="home-content-wrapper">
            <div className="home-content-container">
              {/* <Taps /> */}
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}