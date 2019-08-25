import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styles';

import { SectionTitle } from 'components/base';
import { ToastContext } from 'components';

import { GuestTypes } from './GuestTypes';
import { AddSingleGuest } from './AddSingleGuest';
import { AddCouple } from './AddCouple';
import { AddGroup } from './AddGroup';
import { GuestsSummary } from './GuestsSummary';

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
  border-left: ${({ theme }) => `1px dashed ${theme.colors.primaryDarker}`};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: 0.3s ease opacity;
`;

export class Wedding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGuestType: '',
      activityFeed: [],
    };
  }

  onGuestTypeChange = activeGuestType => {
    this.setState({ activeGuestType });
  };

  onAddSuccess = data => {
    const {
      actions: { showMessage },
    } = this.context;
    const message = data.guest
      ? 'Dodano nowego Gościa!'
      : 'Dodano nowych Gości!';
    showMessage(message);

    const guestNames = data.guest
      ? `${data.guest.firstName} ${data.guest.lastName}`
      : data.guests
          .map(guest => `${guest.firstName} ${guest.lastName}`)
          .join(', ');

    this.setState(prevState => ({
      activityFeed: [`Dodano ${guestNames}`, ...prevState.activityFeed],
    }));
  };

  render() {
    const { activeGuestType, activityFeed } = this.state;

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
                <GuestsSummary weddingId={weddingId} />
                {activityFeed.length > 0 && (
                  <>
                    <div
                      style={{ fontFamily: 'SofiaProBold', marginTop: '60px' }}
                    >
                      Dziennik aktywności
                    </div>
                    <ul>
                      {activityFeed.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </LeftSide>
              <RightSide isVisible={!!activeGuestType}>
                {
                  {
                    guestSingle: (
                      <AddSingleGuest
                        weddingId={weddingId}
                        handleAddSuccess={this.onAddSuccess}
                      />
                    ),
                    guestCouple: (
                      <AddCouple
                        weddingId={weddingId}
                        handleAddSuccess={this.onAddSuccess}
                      />
                    ),
                    guestGroup: (
                      <AddGroup
                        weddingId={weddingId}
                        handleAddSuccess={this.onAddSuccess}
                      />
                    ),
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

Wedding.contextType = ToastContext;
