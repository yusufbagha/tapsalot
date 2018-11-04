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
            <p>What in the world are we supposed to do? -</p>
            <p>superduperkyle</p>
          </div>
          <div className="message-container">
            <p>Just keeping clicking ya'll -</p>
            <p>bunburger</p>
          </div>
        </div>
      </div>
    );
  }
}