import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2'
import './ChatMessages.scss';
import { Session } from 'meteor/session';

const Messages = new Mongo.Collection('messages');
let limit = 50;

class ChatMessages extends Component {
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

  renderMessages() {
    return this.props.messages.map((message) => (
      <div className="message-container" key={message._id}>
          <p><span onClick={() => this.showProfile(message.user)}>{message.user.username}</span> - {message.message}</p>
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
  Meteor.subscribe('public.users');

  let limit = Session.get('limit')

  if (limit == undefined) {
    limit = 50;
    Session.set('limit', limit)
  }

  let messages = Messages.find({}, {sort: {date: -1}, limit: limit});
  let messagesArr = [];

  window.onscroll = (event) => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      Session.set('limit', limit + 30)
    }
  };

  messages.forEach((document) => {
    document.user = Meteor.users.findOne({_id: document.userId});

    messagesArr.push(document)
  })

  return {
    messages: messagesArr,
  };
})(ChatMessages);