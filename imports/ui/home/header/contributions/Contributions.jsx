import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2'
import './Contributions.scss';

// Is there a better way to declare mongo collections in react components?
const Taps = new Mongo.Collection('taps');

export class Contributions extends Component {
  // Changes Username
  changeUsername(title) {
    let tryAgain = (title) => {
      this.changeUsername(title);
    }

    // SweetAlert
    swal({
      padding: '1.5em',
      title: title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText:  'Change Username',
      backdrop: `
        rgb(174, 152, 255)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        center left
        no-repeat
      `
    }).then((result) => {
      if (result.value) {
        // Calls 'username.update' Method
        Meteor.call('username.update', result.value, (error, result) => {
          if (error) {
            // Runs tryAgain() On Error From Server
            tryAgain('Username Taken, Try Again');
          }
        });
      }
    });
  }

  render() {
    return (
      <div className="contributions-container">
        {/* Number Of Contributions */}
        <p>{this.props.counter} Contributions</p>

        {/* Username Blank If Not Logged In */}
        <p className="contributions-username">
          { this.props.currentUser ? 
          <span>
            { this.props.currentUser.username }
            {/* Font Awesome Icon Triggers changeUsername() When Clicked */}
            <i className="fas fa-pen-square" onClick={() => this.changeUsername()}></i>
          </span> : '' } 
        </p>
      </div>
    );
  }
}

export default withTracker(() => {
  // Counts Contributions
    // Problem : total number of taps can't load until user contributions are finished being counted
  Meteor.subscribe('contributions.count');
  let value = Taps.find({}).count();

  return {
    counter: value,
    currentUser: Meteor.user(),
  };
})(Contributions);

// Comments

/* 

  # Random things occur when opening changeUsername() view

  # Giphy dev key : 'JV5ojFZAjMYai9rQLlA7xOOXaWsVjHr3'
  # NOTE : DO NOT PUT PRODUCTION KEYS IN CLIENT

*/