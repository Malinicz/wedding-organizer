import React, { Component } from 'react';
import styled from 'styles';
import { GuestForm } from './GuestForm';
import { Query } from 'react-apollo';
import { PageNotFound } from 'scenes';
import { GET_GUEST_INITIAL_DATA } from 'graphql/queries';
import { Loader } from 'components';

const EditGroupHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

export class EditGroup extends Component {
  render() {
    const {
      match: {
        params: { id: guestGroupId },
      },
    } = this.props;

    return (
      <Query query={GET_GUEST_INITIAL_DATA} variables={{ id: guestGroupId }}>
        {({ data: { GuestGroup: guestGroup }, loading, error }) => {
          if (loading) {
            return <Loader />;
          }

          if (!error && !guestGroup) {
            return <PageNotFound />;
          }

          return (
            <EditGroupHolder>
              <GuestForm guestGroup={guestGroup} />
            </EditGroupHolder>
          );
        }}
      </Query>
    );
  }
}
