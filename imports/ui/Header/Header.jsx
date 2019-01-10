import React, { Component } from 'react';
import Contributions from './Contributions/Contributions';
import UsersOnline from './UsersOnline/UsersOnline';
import './Header.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <div className="header-container">
          <Contributions />
          <UsersOnline />
        </div>
      </div>
    );
  }
}