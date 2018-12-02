import React from 'react';
import { Route, Redirect } from 'react-router';
import { Query } from 'react-apollo';

import { GET_IS_LOGGED } from 'graphql/queries';

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
