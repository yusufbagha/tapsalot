import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Messages } from '../../../api/collections';
import { Profile } from '../../Profile/profile'
import './ChatMessages.scss';

class ChatMessages extends Component {
  renderMessages() {
    return this.props.messages.map((message) => (
      <div className="message-container" key={message._id}>
          <p><span onClick={() => Profile(message.user)}>{message.user.username}</span> - {message.message}</p>
      </div>
    ));
  }

  render() {
    return (
      <div className="chat-messages-wrapper">
        <div className="chat-messages-container">
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('public.messages');
  Meteor.subscribe('public.users');

  // get limit from Session : if Session variable does not exist set limit to 50
  let limit = Session.get('limit')

  if (limit == undefined) {
    limit = 50;
    Session.set('limit', limit)
  }

  // increase limit by 30 when user hits bottom of page
  window.onscroll = (event) => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      Session.set('limit', limit + 30)
    }
  };

  // get messages
  let messages = Messages.find({}, {sort: {date: -1}, limit: limit});
  let messagesArr = [];

  // add username to each message from userId
  messages.forEach((message) => {
    if (message.userId) {
      message.user = Meteor.users.findOne({_id: message.userId});

      if (!message.user) {
        message.user = 'Deleted User'
      }

      messagesArr.push(message)
    }
  })

  return {
    messages: messagesArr,
  };
})(ChatMessages);