import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Counter } from '../../../api/collections';
import './TapCounter.scss';

class TapCounter extends Component {
  render() {
    return (
      <div className="tap-counter-container">
        <p>{ this.props.counter ? <span>{ this.props.counter }</span> : '0' }</p>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('taps.count');
  let obj = Object(Counter.findOne({name: 'delayedCounter'}));

  return {
    counter: obj.value,
  };
})(TapCounter);