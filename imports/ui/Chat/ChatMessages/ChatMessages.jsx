import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './ChatMessages.scss';

const Messages = new Mongo.Collection('messages');
// const Usernames = new Mongo.Collection('usernames');

class ChatMessages extends Component {
  renderMessages() {
    return this.props.messages.map((message) => (
      <div className="message-container" key={message._id}>
          <p>{message.message} -</p>
          <p>{message.username}</p>
      </div>
    ));
  }
  // state = {
    
  // }

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
  Meteor.subscribe('public.usernames');

  let messages = Messages.find({}, {sort: {date: -1}});
  let messagesArr = [];

  messages.forEach((document) => {
    document.username = Meteor.users.findOne({_id: document.userId}).username;

    messagesArr.push(document)
  })

  return {
    messages: messagesArr,
  };
})(ChatMessages);
