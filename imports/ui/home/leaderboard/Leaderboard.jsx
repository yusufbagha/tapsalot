import React, { Component } from 'react';
import './Leaderboard.scss';

// Leaderboard Component Is Empty

export default class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard-wrapper">
        <div className="leaderboard-container">
          <div className="leaderboard-options">
            <p className="selected">Users</p>
            <p>Country</p>
            <p>City</p>
          </div>
          {/* Users are random colors */}
          <div className="leaderboard-items">
            <div className="leaderboard-item">
              <p>1 :</p>
              <p>SuperDuperKyle</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}