import React, { Component } from 'react';

import { LoginForm } from './components';

export class AuthScene extends Component {
  render() {
    return <LoginForm {...this.props} />;
  }
}

export default AuthScene;
