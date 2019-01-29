import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Profile } from '../Profile/profile'
import './Leaderboard.scss';

class Leaderboard extends Component {  
  renderUsers() {
    return this.props.users.map((user, index) => (
      <div className="leaderboard-item" key={user._id}>
        <p>{index + 1} :</p>
        <p onClick={() => Profile(user)}>{user.username} ({ user.profile.contributions ? <span>{ user.profile.contributions }</span> : '0' })</p>
      </div>
    ));
  }

  render() {
    return (
      <div className="leaderboard-wrapper">
        <div className="leaderboard-container">
          {/* <div className="leaderboard-options">
            <p className="selected">Users</p>
            <p>Country</p>
            <p>City</p>
          </div> */}
          <div className="leaderboard-items">
            {this.renderUsers()}
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('public.users');

  // get top 50 users
  let users = Meteor.users.find({}, {sort: {'profile.contributions': -1}, limit: 50}).fetch();
  let checkedUsers = [];

  // checking if users have profile contribution : likely cause - legacy accounts
  for (let user of users) {
    // refactor
      // 'if' nightmare caused by data bug 
    if (user) {
      if (user.profile) {
        if (!user.profile.contributions) {
          user.profile.contributions = 0;
        }
  
        checkedUsers.push(user);
      }
    }
  }

  return {
    users: checkedUsers,
  };
})(Leaderboard);