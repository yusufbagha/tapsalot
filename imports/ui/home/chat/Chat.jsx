import React, { Component } from 'react';
import ChatMessages from './chatMessages/ChatMessages';
import ChatInputs from './chatInputs/ChatInputs';
import './Chat.scss';


export default class Chat extends Component {
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
      <div className="chat-wrapper">
        <div className="chat-container">
          <ChatInputs />
          <ChatMessages />
        </div>
      </div>
    );
  }
}