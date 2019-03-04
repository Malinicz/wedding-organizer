import React, { Component } from 'react';

import { Switch } from 'react-router-dom';

import { PrivateRoute } from 'components';

import { ORGANISER_WEDDING } from 'constants/routes';

import { Wedding } from './scenes';
import { Layout } from './components';

export class Organiser extends Component {
  render() {
    return (
      <Switch>
        <Layout>
          <PrivateRoute
            exact
            path={`${ORGANISER_WEDDING}/:id`}
            component={Wedding}
          />
        </Layout>
      </Switch>
    );
  }
}
