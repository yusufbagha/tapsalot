import React, { Component } from 'react';
import Header from '../Header/Header';
import Taps from '../Taps/Taps';
import Leaderboard from '../Leaderboard/Leaderboard';
import './Home.scss';

export default class Home extends Component {
  componentDidUpdate() {
    document.body.scrollTop = 0;
  }
  
  render() {
    return (
      //  home-wrapper Triggers tap() When Clicked
      <div className="home-wrapper">
        <div className="home-container">
          <Header />
          <div className="home-content-wrapper">
            <div className="home-content-container">
              <Taps />
              <Leaderboard history={this.props.history}/>
              <div></div>
            </div>
            <div id="appTrigger">
              <i className="fas fa-brain" onClick={() => this.props.history.push('/chat')}></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}