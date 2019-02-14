import React, { Component } from 'react';
import styled from 'styled-components';

import { Layout } from 'components';
import { H1, Section, Card } from 'components/base';
import { GuestSignIn } from './components';

import logo from 'assets/logo.png';

const LoginSection = styled(Section)`
  margin: 130px 0 10px 0;
  justify-content: center;
`;

const CallToActionSection = styled(Section)`
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const CallToActionText = styled.h2`
  max-width: 500px;
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  font-size: 1.2em;
  line-height: 1.4em;
  text-align: center;
`;

const CallToActionButton = styled.a`
  margin-top: 20px;
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  font-size: 2em;
  color: ${({ theme }) => theme.colors.primaryDarkest};
  cursor: pointer;
`;

const Logo = styled.img`
  position: absolute;
  left: 50%;
  top: -115px;
  transform: translateX(-50%);
  width: 230px;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    width: 200px;
    top: -100px;
  }
`;

const Title = styled(H1)`
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  font-size: 1.8em;
`;

export class Home extends Component {
  render() {
    return (
      <Layout>
        <LoginSection>
          <Card>
            <Logo src={logo} />
            <Title>Witaj, gościu!</Title>
            <GuestSignIn {...this.props} />
          </Card>
        </LoginSection>
        <CallToActionSection>
          <CallToActionText>
            “Witaj, gościu” to aplikacja która oszczędzi Twój czas podczas
            organizacji wesela. Brzmi dobrze?
          </CallToActionText>
          <CallToActionButton>DOWIEDZ SIĘ WIĘCEJ!</CallToActionButton>
        </CallToActionSection>
      </Layout>
    );
  }
}
