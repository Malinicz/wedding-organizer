import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import { Loader } from 'components';

import { GET_AUTH_USER } from 'graphql/queries';

import { SIGN_IN } from 'constants/routes';

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <Query query={GET_AUTH_USER}>
            {({ data: { user }, loading }) => {
              if (loading) return <Loader />;
              if (!user) return <Redirect to={{ pathname: SIGN_IN }} />;
              return <Component {...props} />;
            }}
          </Query>
        );
      }}
    />
  );
}
