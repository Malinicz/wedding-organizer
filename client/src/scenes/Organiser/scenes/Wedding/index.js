import React, { useState, useContext } from 'react';
import { Query } from 'react-apollo';
import styled from 'styles';

import { SectionTitle } from 'components/base';
import { ToastContext, Modal } from 'components';

import { GuestTypes } from './GuestTypes';
import { AddSingleGuest } from './AddSingleGuest';
import { AddCouple } from './AddCouple';
import { AddGroup } from './AddGroup';
import { GuestsSummary } from './GuestsSummary';

import { GET_AUTH_USER } from 'graphql/queries';
import { ActivityLog } from './ActivityLog';

const GUEST_TYPE_DISPLAY_NAMES = {
  guestSingle: 'Pojedynczy Gość',
  guestCouple: 'Para',
  guestGroup: 'Para + Dzieci'
}

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
  padding-top: 110px;
  border-left: ${({ theme }) => `1px dashed ${theme.colors.primaryDarker}`};
`;

export const Wedding = () => {
  const [activityFeed, setActivityFeed] = useState([]);
  const [activeGuestType, setActiveGuestType] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { actions: { showMessage } } = useContext(ToastContext);

  const onGuestTypeClick = (activeGuestType) => {
    setActiveGuestType(activeGuestType);
    setIsModalOpen(true);
  }

  const onAddSuccess = data => {
    onModalClose();
    const message = data.guest
      ? 'Dodano nowego Gościa!'
      : 'Dodano nowych Gości!';
    showMessage(message);

    const guestNames = data.guest
      ? `${data.guest.firstName} ${data.guest.lastName}`
      : data.guests
        .map(guest => `${guest.firstName} ${guest.lastName}`)
        .join(', ');

    setActivityFeed([{ time: Date.now(), description: `Dodano ${guestNames}` }, ...activityFeed])
  };

  const onModalClose = () => {
    setActiveGuestType(undefined);
    setIsModalOpen(false);
  }

  return (
    <Query query={GET_AUTH_USER}>
      {({ data: { user } }) => {
        const weddingId = user && user.weddings[0].id;

        return (
          <>
            <AddGuestsHolder>
              <LeftSide>
                <SectionTitle>Dodaj gości</SectionTitle>
                <GuestTypes
                  activeType={activeGuestType}
                  handleChange={onGuestTypeClick}
                />
              </LeftSide>
              <RightSide>
                <GuestsSummary weddingId={weddingId} />
                <ActivityLog list={activityFeed} />
              </RightSide>
            </AddGuestsHolder>
            {isModalOpen && <Modal handleClose={onModalClose}>
              <Modal.Title>{GUEST_TYPE_DISPLAY_NAMES[activeGuestType]}</Modal.Title>
              <Modal.Content>
                {
                  {
                    guestSingle: (
                      <AddSingleGuest
                        weddingId={weddingId}
                        handleAddSuccess={onAddSuccess}
                      />
                    ),
                    guestCouple: (
                      <AddCouple
                        weddingId={weddingId}
                        handleAddSuccess={onAddSuccess}
                      />
                    ),
                    guestGroup: (
                      <AddGroup
                        weddingId={weddingId}
                        handleAddSuccess={onAddSuccess}
                      />
                    ),
                  }[activeGuestType]}
              </Modal.Content>
            </Modal>}
          </>
        );
      }}
    </Query>
  );
}
