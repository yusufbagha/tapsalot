import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base'
import Header from '../Header/Header';
import Taps from '../Taps/Taps';
// import Leaderboard from '../leaderboard/Leaderboard';
// import Chat from '../chat/Chat'
import './Home.scss';

export default class Home extends Component {
  
  render() {
    return (
      //  home-wrapper Triggers tap() When Clicked
      <div className="home-wrapper">
        <div className="home-container">
          <Header />
          <div className="home-content-wrapper">
            <div className="home-content-container">
              <Taps />
              <div id="appTrigger">
                <i className="fas fa-brain" onClick={() => this.props.history.push('/chat')}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}