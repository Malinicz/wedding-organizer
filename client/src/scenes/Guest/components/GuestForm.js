import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styles';

import { ActionButton, RadioInputGroup } from 'components';
import { Form, InputGroupLabel, TextArea, Input } from 'components/base';
import { GuestCard, RADIO_INPUT_TRUE_FALSE_OPTIONS } from './GuestCard';
import { DeletePartnerModal } from './DeletePartnerModal';
import { AddPartnerModal } from './AddPartnerModal';

import { SAVE_GUEST_GROUP_FORM } from 'graphql/mutations';

import { toBoolean } from 'utils/helpers';

import { GUEST_FORM_SUBMISSION_SUCCESS } from 'constants/routes';
import { RETRY_MESSAGE } from 'constants/errorMessages';

import { pl } from 'languages';

const GuestFormHolder = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1250px;
`;

const GuestCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    margin-bottom: -15px;
  }
`;

const GuestGroupQuestions = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  text-align: center;
  margin-bottom: 50px;
`;

export class GuestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: this.initializeForm(),
      isAddPartnerModalOpen: false,
      isDeletePartnerModalOpen: false,
      activeGuest: undefined,
    };
  }

  initializeForm = () => {
    const {
      guestGroup: {
        id,
        wedding,
        customGreeting,
        guests,
        accomodation,
        comments,
        transport,
        contactEmail,
      },
    } = this.props;

    return {
      id,
      wedding,
      customGreeting,
      accomodation,
      comments: comments || '',
      transport,
      contactEmail: contactEmail || '',
      guests: guests.map(guest => ({
        id: guest.id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        allowPartner: guest.allowPartner,
        isPresent: guest.isPresent,
        isVegetarian: guest.isVegetarian,
        isDrinkingAlcohol: guest.isDrinkingAlcohol,
        partner: guest.partner,
      })),
    };
  };

  onGuestRadioInputChange = (value, guestId, name) => {
    const { guests } = this.state.form;
    const updatedGuests = guests.map(guest =>
      guestId === guest.id ? { ...guest, [name]: toBoolean(value) } : guest
    );
    this.setState({ form: { ...this.state.form, guests: updatedGuests } });
  };

  onGuestGroupRadioInputChange = (value, name) => {
    this.setState({ form: { ...this.state.form, [name]: toBoolean(value) } });
  };

  onCommentsChange = text => {
    this.setState({ form: { ...this.state.form, comments: text } });
  };

  onEmailChange = text => {
    this.setState({ form: { ...this.state.form, contactEmail: text } });
  };

  onAddPartnerSuccess = (guestId, partner) => {
    const {
      form,
      form: { guests },
    } = this.state;
    this.setState({
      isAddPartnerModalOpen: false,
      activeGuest: undefined,
      form: {
        ...form,
        guests: guests
          .map(guest =>
            guest.id === guestId
              ? { ...guest, partner: { id: partner.id } }
              : guest
          )
          .concat(partner),
      },
    });
  };

  onDeletePartnerSuccess = (partnerId, guestId) => {
    const {
      form,
      form: { guests },
    } = this.state;
    this.setState({
      isDeletePartnerModalOpen: false,
      form: {
        ...form,
        guests: guests
          .filter(guest => guest.id !== partnerId)
          .map(guest =>
            guest.id === guestId ? { ...guest, partner: undefined } : guest
          ),
      },
    });
  };

  onAddPartnerModalOpen = activeGuest => {
    this.setState({ isAddPartnerModalOpen: true, activeGuest });
  };

  onAddPartnerModalClose = () => {
    this.setState({
      isAddPartnerModalOpen: false,
      activeGuest: undefined,
    });
  };

  onDeletePartnerModalOpen = activeGuest => {
    this.setState({ isDeletePartnerModalOpen: true, activeGuest });
  };

  onDeletePartnerModalClose = () => {
    this.setState({
      isDeletePartnerModalOpen: false,
      activeGuest: undefined,
    });
  };

  render() {
    const {
      form,
      isAddPartnerModalOpen,
      isDeletePartnerModalOpen,
      activeGuest,
      form: { guests, id: guestGroupId },
    } = this.state;
    const { guestGroup, history } = this.props;

    const isGuestGroupPresent = guests.some(guest => guest.isPresent);

    return (
      <Mutation
        mutation={SAVE_GUEST_GROUP_FORM}
        variables={form}
        onCompleted={() => history.push(GUEST_FORM_SUBMISSION_SUCCESS)}
      >
        {(saveGuestGroupForm, { loading, error }) => (
          <>
            <GuestFormHolder
              onSubmit={e => {
                e.preventDefault();
                saveGuestGroupForm();
              }}
            >
              <GuestCards>
                {guests.map((guest, index) => {
                  return (
                    <GuestCard
                      key={guest.id}
                      guest={guest}
                      guestGroupId={guestGroupId}
                      handleAddPartnerModalOpen={this.onAddPartnerModalOpen}
                      handleDeletePartnerModalOpen={
                        this.onDeletePartnerModalOpen
                      }
                      handleRadioInputChange={this.onGuestRadioInputChange}
                      animationDelay={index / 8}
                    />
                  );
                })}
              </GuestCards>
              <GuestGroupQuestions>
                <RadioInputGroup
                  label={`Czy zapewnić ${
                    guests.length === 1 ? 'Ci' : 'Wam'
                  } transport busem?`}
                  name="transport"
                  activeValue={form.transport}
                  options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
                  disabled={!isGuestGroupPresent}
                  handleChange={e =>
                    this.onGuestGroupRadioInputChange(
                      e.target.value,
                      'transport'
                    )
                  }
                />
                <br />
                {guestGroup.allowAccomodation && (
                  <>
                    <RadioInputGroup
                      label={`Zarezerwować dla ${
                        guests.length === 1 ? 'Ciebie' : 'Was'
                      } nocleg?`}
                      name="accomodation"
                      activeValue={form.accomodation}
                      options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
                      disabled={!isGuestGroupPresent}
                      handleChange={e =>
                        this.onGuestGroupRadioInputChange(
                          e.target.value,
                          'accomodation'
                        )
                      }
                    />
                    <br />
                  </>
                )}
                <InputGroupLabel>
                  Uwagi, sugestie czy dodatkowe prośby wpiszcie poniżej{' '}
                  <span role="img" aria-label="uśmiechnięta buźka">
                    😉
                  </span>
                </InputGroupLabel>
                <TextArea
                  type="text"
                  value={form.comments}
                  onChange={e => this.onCommentsChange(e.target.value)}
                />
                <br />
                <InputGroupLabel>
                  Jeśli chcecie, zostawcie nam swój email
                </InputGroupLabel>
                <Input
                  type="text"
                  value={form.contactEmail}
                  placeholder="jan.nowak@gmail.com"
                  onChange={e => this.onEmailChange(e.target.value)}
                />
                <ActionButton
                  loading={loading}
                  error={error && RETRY_MESSAGE}
                  type="submit"
                  label={guestGroup.submissionDate ? 'Zaktualizuj' : 'Gotowe!'}
                />
              </GuestGroupQuestions>
            </GuestFormHolder>
            {isAddPartnerModalOpen && (
              <AddPartnerModal
                guestId={activeGuest.id}
                handleClose={this.onAddPartnerModalClose}
                handleAddPartnerSuccess={this.onAddPartnerSuccess}
                guestGroupId={guestGroupId}
              />
            )}
            {isDeletePartnerModalOpen && (
              <DeletePartnerModal
                guest={activeGuest}
                handleClose={this.onDeletePartnerModalClose}
                handleDeletePartnerSuccess={this.onDeletePartnerSuccess}
              />
            )}
          </>
        )}
      </Mutation>
    );
  }
}
