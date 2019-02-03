import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { client as apolloClient } from 'App';

import { H1 } from 'components/base';

import { UPDATE_GUEST_GROUP } from 'graphql/mutations';
import { GET_GUEST_INITIAL_DATA } from 'graphql/queries';

import { SIGN_IN } from 'constants/routes';

export class Guest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
        {({ data, loading, error }) => {
          if (loading) {
            return <div>loading...</div>;
          }

          return (
            <div>
              <H1>Formularz gościa</H1>
              <Mutation
                mutation={UPDATE_GUEST_GROUP}
                variables={{ id: guestGroupId, transport: false }}
              >
                {updateGuestGroup => (
                  <button onClick={updateGuestGroup}>test</button>
                )}
              </Mutation>
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
