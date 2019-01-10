import React, { Component } from 'react';
import Header from '../Header/Header';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInputs from './ChatInputs/ChatInputs';
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
      <div className="home-wrapper">
        <div className="home-container">
          <Header />
          <div className="social-content-wrapper">
            <div className="social-content-container">
              <ChatInputs />
              <ChatMessages />
            </div> 
          </div>
        </div>
      </div>
    );
  }
}