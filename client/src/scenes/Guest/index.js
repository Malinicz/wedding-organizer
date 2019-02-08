import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { client as apolloClient } from 'App';

import { H1 } from 'components/base';
import { GuestForm } from './components';

import { GET_GUEST_INITIAL_DATA } from 'graphql/queries';

import { SIGN_IN } from 'constants/routes';

export class Guest extends Component {
  onLogout = () => {
    apolloClient.resetStore();
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    this.props.history.push(SIGN_IN);
  };

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
            return <div>loading...</div>;
          }

          return (
            <div>
              <H1>Formularz</H1>
              <GuestForm guestGroup={guestGroup} drinkOptions={drinkOptions} />
              <div>
                <button onClick={this.onLogout}>Wyloguj się</button>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
