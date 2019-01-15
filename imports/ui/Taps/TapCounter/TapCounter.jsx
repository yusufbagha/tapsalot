import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './TapCounter.scss';

// Is there a better way to declare mongo collections in react components?
const Counter = new Mongo.Collection('counter');

class TapCounter extends Component {
  render() {
    return (
      <div className="tap-counter-container">
        {/* Number Of Global Taps */}
        <p>{ this.props.counter ? <span>{ this.props.counter }</span> : '0' }</p>
      </div>
    );
  }
}

export default withTracker(() => {
  // Gets Number Of Global Taps
  Meteor.subscribe('taps.count');
  let obj = Object(Counter.findOne({name: 'delayedCounter'}));

  return {
    counter: obj.value,
  };
})(TapCounter);