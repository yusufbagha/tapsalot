import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './UsersOnline.scss';

export class UsersOnline extends Component {
  render() {
    return (
      <div className="users-online-container">
        {/* Number Of Users Online */}
        <p>{this.props.usersOnline} Comrads Online</p>
        <p>{this.props.users} Members</p>
      </div>
    );
  }
}

export default withTracker(() => {
  // Counts Users Online
  Meteor.subscribe('users.online');
  Meteor.subscribe('public.usernames');

  let usersOnline = Meteor.users.find({ "status.online" : true }).count();
  let users = Meteor.users.find({}).count();

  return {
    usersOnline: usersOnline,
    users: users,
  };
})(UsersOnline);