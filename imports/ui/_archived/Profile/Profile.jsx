import React, { Component } from 'react';
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data';
import './Profile.scss';

class Profile extends Component {
  componentDidUpdate() {
    document.body.scrollTop = 0;
  }  

  render() {
    if (this.props.user == undefined) {
      this.props.history.push('/')
    }

    return (
      <div className="profile-wrapper">
        <div className="profile-container">
          <h2>{this.props.user.username}</h2>
          <p>Contributions: {this.props.user.profile.contributions}</p>
        </div>
      </div>
    );
  }
}


export default withTracker(() => {
  Meteor.subscribe('public.users');
  let userId = Session.get('userId');
  let user = Meteor.users.findOne({_id: userId});

  if (!userId) {
    user = undefined;
  }

  return {
    user: user,
  };
})(Profile);