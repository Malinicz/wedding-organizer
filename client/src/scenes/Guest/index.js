import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styles';

import { Layout, Main, Loader } from 'components';
import { Section, H1 } from 'components/base';
import { GuestForm } from './components';
import { PageNotFound } from 'scenes';

import { GET_GUEST_INITIAL_DATA } from 'graphql/queries';

import logo from 'assets/logo.png';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
  padding: 0 15px;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    margin-bottom: 40px;
  }
`;

const Logo = styled.img`
  width: 230px;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    width: 180px;
  }
`;

const WeddingName = styled(H1)`
  font-size: 1.2em;
`;

const Greeting = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  font-size: 3em;
  margin-top: 70px;
  line-height: 1em;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    font-size: 2.2em;
    margin-top: 30px;
  }
`;

const IntroText = styled.p`
  max-width: 500px;
  text-align: center;
`;

const FormSection = styled(Section)`
  display: flex;
  align-items: center;
`;

export class Guest extends Component {
  render() {
    const {
      history,
      match: {
        params: { id: guestGroupId },
      },
    } = this.props;

    return (
      <Query query={GET_GUEST_INITIAL_DATA} variables={{ id: guestGroupId }}>
        {({ data: { GuestGroup: guestGroup, allDrinks }, loading, error }) => {
          if (loading) {
            return <Loader />;
          }

          if (!error && !guestGroup) {
            return <PageNotFound />;
          }

          return (
            <Layout>
              <Header>
                <Logo src={logo} />
                <WeddingName>{guestGroup.wedding.name}</WeddingName>
                <Greeting>{guestGroup.customGreeting || 'Witaj!'}</Greeting>
                <IntroText>
                  Potrzebujemy od was dosłownie kilku informacji. Będziemy
                  wdzięczni za uzupełnienie wszystkich pól!
                </IntroText>
              </Header>
              <Main>
                <FormSection>
                  <GuestForm
                    guestGroup={guestGroup}
                    drinks={allDrinks}
                    history={history}
                  />
                </FormSection>
              </Main>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
