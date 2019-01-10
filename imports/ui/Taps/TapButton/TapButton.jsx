import React, { Component } from 'react';
import './TapButton.scss';

// 'click' Event Listener Is In 'Home.jsx'

export default class TapButton extends Component {
  render() {
    return (
      <div className="tap-button-container">
        <button>Tap</button>
      </div>
    );
  }
}