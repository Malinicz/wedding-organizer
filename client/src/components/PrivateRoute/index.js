import React from 'react';
import { Route, Redirect } from 'react-router';

import { HOME } from 'constants/routes';

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        const isLogged = window.localStorage.getItem('user');

        return isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: HOME }} />
        );
      }}
    />
  );
}
