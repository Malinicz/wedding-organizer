import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router';
import { Query } from 'react-apollo';

import { PrivateRoute } from 'components';

import { ORGANISER_WEDDING } from 'constants/routes';

import { Wedding } from './scenes';
import { Layout } from './components';
import { GuestList } from './scenes/GuestList';

import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { Loader } from 'components';

import { NOT_FOUND } from 'constants/routes';

export class Organiser extends Component {
  render() {
    const {
      match: {
        params: { id: weddingId },
      },
      history,
    } = this.props;

    return (
      <Query query={GET_WEDDING_INITIAL_DATA} variables={{ id: weddingId }}>
        {({ data: { Wedding: wedding }, loading, error }) => {
          if (loading) {
            return <Loader />;
          }

          if (!error && !wedding) {
            history.push(NOT_FOUND);
            return null;
          }

          return (
            <Layout>
              <Switch>
                <PrivateRoute
                  exact
                  path={`${ORGANISER_WEDDING}/:id/dodaj-gosci`}
                  component={Wedding}
                />
                <PrivateRoute
                  exact
                  path={`${ORGANISER_WEDDING}/:id/lista-gosci`}
                  component={GuestList}
                />
                <Redirect
                  from={`${ORGANISER_WEDDING}/:id`}
                  to={`${ORGANISER_WEDDING}/:id/dodaj-gosci`}
                />
              </Switch>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
