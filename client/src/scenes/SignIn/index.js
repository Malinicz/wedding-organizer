import React, { Component } from 'react';
import styled from 'styled-components';

import { H1 } from 'components/base';
import { GuestSignIn, AdminSignIn } from './components';

const SignInHolder = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGuest: true,
    };
  }

  render() {
    const { isGuest } = this.state;

    return (
      <SignInHolder>
        <H1>Zaloguj się</H1>
        {isGuest ? (
          <GuestSignIn {...this.props} />
        ) : (
          <AdminSignIn {...this.props} />
        )}
      </SignInHolder>
    );
  }
}
