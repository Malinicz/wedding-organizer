import React from 'react';
import { Route, Redirect } from 'react-router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_IS_LOGGED = gql`
  {
    isLogged @client
  }
`;

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <Query query={GET_IS_LOGGED}>
          {({ data: { isLogged } }) => {
            return isLogged ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            );
          }}
        </Query>
      )}
    />
  );
}
