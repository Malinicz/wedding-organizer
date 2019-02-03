import React, { Component } from 'react';
import { client as apolloClient } from 'App';

import { SIGN_IN } from 'constants/routes';

export class Guest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogout = () => {
    apolloClient.resetStore();
    window.localStorage.removeItem('user');
    this.props.history.push(SIGN_IN);
  };

  render() {
    return (
      <div>
        this is guest form<button onClick={this.onLogout}>Wyloguj się</button>
      </div>
    );
  }
}
