import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Username } from '../Username/username'
import './Contributions.scss';

export class Contributions extends Component {  
  render() {
    return (
      <div className="contributions-container">
        <p>
          { this.props.currentUser ? 
            <span>{ this.props.currentUser.profile.contributions }</span> : '0' } Contributions 
        </p>

        <p className="contributions-username" onClick={() => Username()}>
          { this.props.currentUser ? 
          <span>
            <span>{ this.props.currentUser.username }</span>
            <i className="fas fa-pen"></i>
          </span> : '' } 
        </p>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Contributions);