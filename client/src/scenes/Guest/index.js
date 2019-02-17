import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styles';

import { Layout, Loader } from 'components';
import { Section, H1 } from 'components/base';
import { GuestForm } from './components';

import { GET_GUEST_INITIAL_DATA } from 'graphql/queries';

import logo from 'assets/logo.png';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
  padding: 0 15px;
`;

const Logo = styled.img`
  width: 230px;
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
      match: {
        params: { id: guestGroupId },
      },
    } = this.props;

    return (
      <Query query={GET_GUEST_INITIAL_DATA} variables={{ id: guestGroupId }}>
        {({
          data: { GuestGroup: guestGroup, allDrinks: drinkOptions },
          loading,
        }) => {
          if (loading) {
            return <Loader />;
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
              <FormSection>
                <GuestForm
                  guestGroup={guestGroup}
                  drinkOptions={drinkOptions}
                />
              </FormSection>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
