import React, { Component } from 'react';
import './ChatInputs.scss';


export default class ChatInputs extends Component {
  state = {
    counter: 0,
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div className="chat-inputs-container">
        <input type="text" />
        <button><i className="fab fa-telegram-plane"></i></button>
      </div>
    );
  }
}