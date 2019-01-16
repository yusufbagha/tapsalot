import React, { Component } from 'react';
import './NotFound.scss';

export default class NotFound extends Component {
  componentDidUpdate() {
    document.body.scrollTop = 0;
  }
  
  render() {
    return (
      //  home-wrapper Triggers tap() When Clicked
      <div className="home-wrapper">
        <div className="home-container">
          <h2>Oops. Not Found. 404</h2>
          <button>Home</button>
        </div>
      </div>
    );
  }
}