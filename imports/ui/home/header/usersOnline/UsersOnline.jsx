import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './UsersOnline.scss';

export class UsersOnline extends Component {
  render() {
    return (
      <div className="users-online-container">
        {/* Number Of Users Online */}
        <p>{this.props.counter} Comrads Online</p>
      </div>
    );
  }
}

export default withTracker(() => {
  // Counts Users Online
  Meteor.subscribe('users.online');
  let value = Meteor.users.find({}).count();

  return {
    counter: value,
  };
})(UsersOnline);