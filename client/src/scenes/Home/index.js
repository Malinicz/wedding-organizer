import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { Layout, Main } from 'components';
import { H1, Section, Card, RouterLink } from 'components/base';
import { GuestSignIn } from './components';

import { GET_WEDDING_NAMES } from 'graphql/queries';

import { SIGN_IN, ABOUT } from 'constants/routes';

import logo from 'assets/logo.png';

const LoginSection = styled(Section)`
  margin: 130px 0 10px 0;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    margin-top: 100px;
  }
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

const GuestSignInCard = styled(Card)`
  padding-bottom: 40px;
`;

const CallToActionSection = styled(Section)`
  flex-direction: column;
  align-items: center;
`;

const CallToActionText = styled.h2`
  max-width: 500px;
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  font-size: 1.2em;
  line-height: 1.4em;
  text-align: center;
`;

const CallToActionButton = styled(RouterLink)`
  margin-top: 20px;
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  font-size: 2em;
  color: ${({ theme }) => theme.colors.primaryDarkest};
  cursor: pointer;
`;

const Title = styled(H1)`
  padding-top: 30px;
  padding-bottom: 15px;
  text-align: center;
  font-size: 1.8em;
`;

const Subtitle = styled.p`
  padding-bottom: 30px;
  margin: 0 3px;
  text-align: center;
`;

const SignInLink = styled(RouterLink)`
  display: block;
  padding: 10px 0;
  margin-top: -20px;
  text-align: center;
`;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weddingName: '',
    };
  }
  onWeddingNameChange = weddingName => {
    this.setState({ weddingName });
  };

  render() {
    const { weddingName } = this.state;

    return (
      <Query query={GET_WEDDING_NAMES}>
        {({ data }) => {
          return (
            <Layout>
              <Main>
                <LoginSection>
                  <GuestSignInCard>
                    <Logo src={logo} />
                    <Title>{weddingName || 'Witaj, Gościu!'}</Title>
                    <Subtitle>
                      Miło nam, że jesteś{' '}
                      <span role="img" aria-label="uśmiechnięta buźka">
                        😊
                      </span>
                      . Poniżej wprowadź login i kod otrzymany od Pary Młodej.
                    </Subtitle>
                    <GuestSignIn
                      {...this.props}
                      weddings={data ? data.allWeddings : []}
                      handleWeddingNameChange={this.onWeddingNameChange}
                    />
                    <SignInLink to={SIGN_IN}>Nie jestem Gościem</SignInLink>
                  </GuestSignInCard>
                </LoginSection>
                <CallToActionSection>
                  <CallToActionText>
                    “Witaj, Gościu!” to aplikacja, która pozwoli Ci w łatwy i
                    przyjemny sposób zarządzać swoimi Gośćmi weselnymi. Brzmi
                    dobrze?
                  </CallToActionText>
                  <CallToActionButton to={ABOUT}>
                    DOWIEDZ SIĘ WIĘCEJ!
                  </CallToActionButton>
                </CallToActionSection>
              </Main>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
