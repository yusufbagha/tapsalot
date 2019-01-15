import React, { Component } from 'react';
import './ChatInputs.scss';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';


export default class ChatInputs extends Component {
  state = {
    counter: 0,
  }

  randomAdj() {
    // import array of words
    let arr = ['amazing', 'nice', 'sweet', 'dope', 'incredible', 'weird', 'funny', 'witty', 'crazy', 'sexy'];
    let i = Math.floor(Math.random() * arr.length);

    return arr[i];
  }

  sendMessage(event) {
    let element = event.target;

    let send = () => {
      let message;

      if (event.key == 'Enter') {
        message = element.value;
        element.value = '';
      } else if (element.tagName == 'I') {
        let inputElement = element.parentNode.previousSibling;
        message = inputElement.value;
        inputElement.value = '';
      }

      if (1 < message.length) {
        Meteor.call('message.insert', message, (error, result) => {
          if (error) {
            swal('Oops...', error.message ,'error');
          }
        });
      } else {
        swal('Whoops!', 'Messages must be at least 2 characters' ,'error');
      }
    }

    if (event.key == 'Enter' || element.tagName == 'I') {
      send();
    }
  }

  render() {
    return (
      <div className="chat-inputs-container">
        <input type="text" placeholder={`Type something ${this.randomAdj()}... Only 25 Contributions`} onKeyPress={this.sendMessage} maxLength='100' />
        <button><i className="fab fa-telegram-plane" onClick={this.sendMessage}></i></button>
      </div>
    );
  }
}