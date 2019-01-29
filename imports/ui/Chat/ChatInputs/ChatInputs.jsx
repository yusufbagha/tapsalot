import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';
import './ChatInputs.scss';

export default class ChatInputs extends Component {
  randomAdj() {
    // import array of words instead
    let arr = ['amazing', 'nice', 'sweet', 'dope', 'incredible', 'weird', 'funny', 'witty', 'crazy', 'sexy'];
    let index = Math.floor(Math.random() * arr.length);

    return arr[index];
  }

  // refactor this method
  sendMessage(event) {
    let element = event.target;

    let send = () => {
      let message;

      // brute method : quick code : dry later
      if (event.key == 'Enter') {
        message = element.value;
        element.value = '';
      } else if (element.tagName == 'I') {
        let inputElement = element.parentNode.previousSibling;
        message = inputElement.value;
        inputElement.value = '';
      }

      // invoking server method : checking contributions & message length (additionally validated on server)
      if (Meteor.user().profile.contributions >= 25) {
        if (1 < message.length) {
          Meteor.call('message.insert', message, (error, result) => {
            if (error) {
              swal('Oops...', error.message ,'error');
            }
          });
        } else {
          swal('Whoops!', 'Messages must be at least 2 characters' ,'error');
        }
      } else {
        swal('Whoops!', 'Not enough contributions. You need 25 to send a message. You can earn more by clicking' ,'error');
      }
    }

    // fix after drying event value
    if (event.key == 'Enter' || element.tagName == 'I') {
      send();
    }
  }

  render() {
    return (
      <div className="chat-inputs-container">
        <input type="text" placeholder={`Type something ${this.randomAdj()}... Only 25 Contributions`} onKeyPress={this.sendMessage} maxLength='150' />
        <button><i className="fab fa-telegram-plane" onClick={this.sendMessage}></i></button>
      </div>
    );
  }
}