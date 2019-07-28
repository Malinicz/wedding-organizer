import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styles';

import { SectionTitle } from 'components/base';

import { GuestTypes } from './GuestTypes';
import { AddSingleGuest } from './AddSingleGuest';
import { AddCouple } from './AddCouple';
import { AddGroup } from './AddGroup';

import { GET_AUTH_USER } from 'graphql/queries';

const AddGuestsHolder = styled.div`
  display: flex;
  height: 100%;
`;

const Section = styled.div`
  padding: ${({ theme }) =>
    `${theme.baseSpacing}px ${theme.baseSpacing * 2}px`};
`;

const LeftSide = styled(Section)`
  flex: 10;
  min-width: 450px;
`;

const RightSide = styled(Section)`
  flex: 10;
  min-width: 400px;
  border-left: ${({ theme }) => `2px dashed ${theme.colors.primaryDarker}`};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: 0.3s ease opacity;
`;

export class Wedding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGuestType: '',
    };
  }

  onGuestTypeChange = activeGuestType => {
    this.setState({ activeGuestType });
  };

  render() {
    const { activeGuestType } = this.state;

    return (
      <Query query={GET_AUTH_USER}>
        {({ data: { user } }) => {
          const weddingId = user && user.weddings[0].id;

          return (
            <AddGuestsHolder>
              <LeftSide>
                <SectionTitle>Dodaj gości</SectionTitle>
                <GuestTypes
                  activeType={activeGuestType}
                  handleChange={this.onGuestTypeChange}
                />
              </LeftSide>
              <RightSide isVisible={!!activeGuestType}>
                {
                  {
                    guestSingle: <AddSingleGuest weddingId={weddingId} />,
                    guestCouple: <AddCouple weddingId={weddingId} />,
                    guestGroup: <AddGroup weddingId={weddingId} />,
                  }[activeGuestType]
                }
              </RightSide>
            </AddGuestsHolder>
          );
        }}
      </Query>
    );
  }
}
