import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { HOME } from 'constants/routes';

export function GuestRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        // TODO check if guest token is valid
        const token = window.localStorage.getItem('token');

        return token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: HOME }} />
        );
      }}
    />
  );
}
