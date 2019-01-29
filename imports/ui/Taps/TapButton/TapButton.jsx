import React, { Component } from 'react';
import './TapButton.scss';

// 'click' Event Listener Is In 'main.jsx'
export default class TapButton extends Component {
  render() {
    return (
      <div className="tap-button-container">
        <p>Tap</p>
      </div>
    );
  }
}