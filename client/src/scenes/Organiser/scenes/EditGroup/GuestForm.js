import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styles';

import { ActionButton, RadioInputGroup, Checkbox } from 'components';
import { Form, InputGroupLabel, Input } from 'components/base';

import { MANUAL_GUEST_GROUP_UPDATE } from 'graphql/mutations';
import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { toBoolean } from 'utils/helpers';

import { RETRY_MESSAGE } from 'constants/errorMessages';

import { pl } from 'languages';
import {
  GuestCard,
  RADIO_INPUT_TRUE_FALSE_OPTIONS,
  AddPartnerModal,
} from '../../../Guest/components';
import { DeletePartnerModal } from '../../../Guest/components/DeletePartnerModal';

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

class GuestFormComp extends Component {
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
        isDraft,
        transport,
        contactEmail,
      },
    } = this.props;

    return {
      id,
      wedding,
      customGreeting,
      accomodation,
      transport,
      isDraft,
      contactEmail: contactEmail || '',
      guests: guests.map(guest => ({
        id: guest.id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        allowPartner: guest.allowPartner,
        isPresent: guest.isPresent,
        isVegetarian: guest.isVegetarian,
        isDrinkingAlcohol: true,
        partner: guest.partner,
        drinks: guest.drinks,
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

  onIsDrinkingAlcoholChange = (value, guestId) => {
    const { guests } = this.state.form;
    const booleanValue = toBoolean(value);

    const updatedGuests = guests.map(guest =>
      guestId === guest.id
        ? { ...guest, isDrinkingAlcohol: booleanValue, drinks: [] }
        : guest
    );
    this.setState({ form: { ...this.state.form, guests: updatedGuests } });
  };

  onDrinksChange = (drinkId, guestId) => {
    const { guests } = this.state.form;
    const { drinks } = this.props;
    const selectedDrink = drinks.find(drink => drink.id === drinkId);

    const updatedGuests = guests.map(guest =>
      guestId === guest.id
        ? {
            ...guest,
            drinks: guest.drinks.some(drink => drink.id === drinkId)
              ? guest.drinks.filter(drink => drink.id !== drinkId)
              : guest.drinks.concat(selectedDrink),
          }
        : guest
    );
    this.setState({ form: { ...this.state.form, guests: updatedGuests } });
  };

  onGuestGroupRadioInputChange = (value, name) => {
    this.setState({ form: { ...this.state.form, [name]: toBoolean(value) } });
  };

  onEmailChange = text => {
    this.setState({ form: { ...this.state.form, contactEmail: text } });
  };

  onSaveAsDraftChange = () => {
    this.setState(prevState => ({
      form: { ...this.state.form, isDraft: !prevState.form.isDraft },
    }));
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
          .concat({ ...partner, isDrinkingAlcohol: true }),
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
    const { drinks, guestGroup, history } = this.props;

    const drinkOptions = drinks.map(drink => ({
      value: drink.id,
      label: pl.drinks[drink.name],
    }));

    const isGuestGroupPresent = guests.some(guest => guest.isPresent);

    return (
      <Mutation
        mutation={MANUAL_GUEST_GROUP_UPDATE}
        variables={form}
        refetchQueries={[
          {
            query: GET_WEDDING_INITIAL_DATA,
            variables: { id: 'cjrozvol54wsd0167b2ecf9a0' },
          },
        ]}
        onCompleted={() => history.goBack()}
      >
        {(manualGuestGroupUpdate, { loading, error }) => (
          <>
            <GuestFormHolder
              onSubmit={e => {
                e.preventDefault();
                manualGuestGroupUpdate();
              }}
            >
              <GuestCards>
                {guests.map((guest, index) => {
                  return (
                    <GuestCard
                      key={guest.id}
                      drinkOptions={drinkOptions}
                      guest={guest}
                      guestGroupId={guestGroupId}
                      handleAddPartnerModalOpen={this.onAddPartnerModalOpen}
                      handleDeletePartnerModalOpen={
                        this.onDeletePartnerModalOpen
                      }
                      handleRadioInputChange={this.onGuestRadioInputChange}
                      handleDrinksChange={this.onDrinksChange}
                      handleIsDrinkingAlcoholChange={
                        this.onIsDrinkingAlcoholChange
                      }
                      animationDelay={index / 8}
                    />
                  );
                })}
              </GuestCards>
              <GuestGroupQuestions>
                <RadioInputGroup
                  label="Transport spod kościoła na miejsce wesela"
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
                      label="Nocleg"
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
                <InputGroupLabel>Email</InputGroupLabel>
                <Input
                  type="text"
                  value={form.contactEmail}
                  placeholder="jan.nowak@gmail.com"
                  onChange={e => this.onEmailChange(e.target.value)}
                />
                <Checkbox
                  checked={form.isDraft}
                  label="Wersja robocza"
                  onChange={this.onSaveAsDraftChange}
                />
                <ActionButton
                  loading={loading}
                  error={error && RETRY_MESSAGE}
                  type="submit"
                  label={
                    guestGroup.manualSubmissionDate || guestGroup.submissionDate
                      ? 'Zaktualizuj'
                      : 'Zapisz'
                  }
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

export const GuestForm = withRouter(GuestFormComp);
