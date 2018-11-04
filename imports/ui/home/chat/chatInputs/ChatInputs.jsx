import React, { Component } from 'react';
import './ChatInputs.scss';


export default class ChatInputs extends Component {
  state = {
    counter: 0,
  }

  randomAdj() {
    // import array of words
    let arr = ['amazing', 'nice', 'sweet', 'dope', 'incredible', 'weird', 'funny', 'witty', 'crazy'];
    let i = Math.floor(Math.random() * arr.length);

    return arr[i];
  }

  render() {
    return (
      <div className="chat-inputs-container">
        <input type="text" placeholder={`type something ${this.randomAdj()}...`} />
        <button><i className="fab fa-telegram-plane"></i></button>
      </div>
    );
  }
}