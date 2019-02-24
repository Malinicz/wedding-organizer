import React, { Component } from 'react';
import styled from 'styled-components';

import { Layout, Main } from 'components';
import { H1, Section } from 'components/base';
import { AdminSignIn } from './components';

const SignInHolder = styled(Section)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 350px;
`;

const Title = styled(H1)`
  margin: 50px 0 100px 0;
  font-size: 2.5em;
  text-align: center;
`;

export class SignIn extends Component {
  render() {
    return (
      <Layout>
        <Main>
          <SignInHolder>
            <Title>Zaloguj się</Title>
            <AdminSignIn {...this.props} />
          </SignInHolder>
        </Main>
      </Layout>
    );
  }
}
