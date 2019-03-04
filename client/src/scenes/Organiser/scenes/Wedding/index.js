import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styles';

import { Loader } from 'components';

import { PageNotFound } from 'scenes';

import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

export class Wedding extends Component {
  render() {
    const {
      match: {
        params: { id: weddingId },
      },
    } = this.props;

    return (
      <Query query={GET_WEDDING_INITIAL_DATA} variables={{ id: weddingId }}>
        {({ data: { Wedding: wedding }, loading, error }) => {
          if (loading) {
            return <Loader />;
          }

          if (!error && !wedding) {
            return <PageNotFound />;
          }

          return <div>this is main</div>;
        }}
      </Query>
    );
  }
}
