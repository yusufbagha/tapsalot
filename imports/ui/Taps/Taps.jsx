import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import TapCounter from './TapCounter/TapCounter';
import TapButton from './TapButton/TapButton';
import './Taps.scss';

export default class Taps extends Component {
  render() {
    return (
      <div className="taps-wrapper">
        <div className="taps-container">
          <div className="taps-message-container">
            <p>Something Occurs @1mil</p>
          </div>
          <TapCounter />
          <TapButton />
        </div>
      </div>
    );
  }
}