import React, { Component } from 'react';
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2'
import './Leaderboard.scss';

// Leaderboard Component Is Empty

class Leaderboard extends Component {
  showProfile(user) {
    swal({
      title: user.username,
      text: `${user.profile.contributions} Contributions`,
      showConfirmButton: false,
      backdrop: `
        rgb(174, 152, 255)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        center left
        no-repeat
      `
    });
  }
  
  renderUsers() {
    return this.props.users.map((user, index) => (
      <div className="leaderboard-item" key={user._id}>
        <p>{index + 1} :</p>
        <p onClick={() => this.showProfile(user)}>{user.username} ({user.profile.contributions})</p>
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
  let users = Meteor.users.find({}, {sort: {'profile.contributions': -1}, limit: 50}).fetch();

  return {
    users: users,
  };
})(Leaderboard);