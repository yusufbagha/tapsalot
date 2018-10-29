import React, { Component } from 'react';
import './ChatMessages.scss';


export default class ChatMessages extends Component {
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
      <div className="chat-messages-wrapper">
        <div className="chat-messages-container">
          <div className="message-container">
            <p>Hi there!</p>
          </div>
          <div className="message-container">
            <p>Nice to meet you.</p>
          </div>
        </div>
      </div>
    );
  }
}