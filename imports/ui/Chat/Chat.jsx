import React, { Component } from 'react';
import Header from '../Header/Header';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInputs from './ChatInputs/ChatInputs';
import './Chat.scss';

export default class Chat extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <div className="home-container">
          <Header />
          <div className="social-content-wrapper">
            <div className="social-content-container">
              <ChatInputs />
              <ChatMessages />
              <p className="hover-back" onClick={() => this.props.history.push('/')}>Home</p>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}