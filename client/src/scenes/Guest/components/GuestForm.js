import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styles';

import { ActionButton, RadioInputGroup } from 'components';
import { Form, InputGroupLabel, TextArea } from 'components/base';
import { GuestCard, RADIO_INPUT_TRUE_FALSE_OPTIONS } from './GuestCard';
import { AddPartnerModal } from './AddPartnerModal';

import { SAVE_GUEST_GROUP_FORM } from 'graphql/mutations';

import { toBoolean } from 'utils/helpers';

import { pl } from 'languages';
import { DeletePartnerModal } from './DeletePartnerModal';

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
  margin-bottom: 50px;
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
      form: {
        id: undefined,
        guests: [],
      },
      isAddPartnerModalOpen: false,
      isDeletePartnerModalOpen: false,
      activeGuest: undefined,
    };
  }

  componentDidMount() {
    this.initializeForm();
  }

  initializeForm = () => {
    this.setState({ form: this.createFormModel() });
  };

  createFormModel = () => {
    const {
      guestGroup: {
        id,
        wedding,
        customGreeting,
        guests,
        accomodation,
        comments,
        transport,
      },
    } = this.props;

    return {
      id,
      wedding,
      customGreeting,
      accomodation,
      comments,
      transport,
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
    const { drinkOptions } = this.props;
    const selectedDrink = drinkOptions.find(drink => drink.id === drinkId);

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

  onCommentsChange = text => {
    this.setState({ form: { ...this.state.form, comments: text } });
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
    const { drinkOptions } = this.props;

    return (
      <Mutation mutation={SAVE_GUEST_GROUP_FORM} variables={form}>
        {(saveGuestGroupForm, { loading, error }) => (
          <>
            <GuestFormHolder
              onSubmit={e => {
                e.preventDefault();
                saveGuestGroupForm();
              }}
            >
              <GuestCards>
                {guests.map(guest => {
                  return (
                    <GuestCard
                      key={guest.id}
                      drinkOptions={drinkOptions.map(drink => ({
                        value: drink.id,
                        label: pl.drinks[drink.name],
                      }))}
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
                    />
                  );
                })}
              </GuestCards>
              <GuestGroupQuestions>
                <RadioInputGroup
                  label="Czy chcecie, żeby was przewieźć spod kościoła na miejsce wesela?"
                  name="transport"
                  activeValue={form.transport}
                  options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
                  handleChange={e =>
                    this.onGuestGroupRadioInputChange(
                      e.target.value,
                      'transport'
                    )
                  }
                />
                <br />
                <RadioInputGroup
                  label="Czy chcecie, żeby zarezerwować dla Was nocleg?"
                  name="accomodation"
                  activeValue={form.accomodation}
                  options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
                  handleChange={e =>
                    this.onGuestGroupRadioInputChange(
                      e.target.value,
                      'accomodation'
                    )
                  }
                />
                <br />
                <InputGroupLabel>
                  Szczególne życzenia lub uwagi wpiszcie poniżej ;)
                </InputGroupLabel>
                <TextArea
                  type="text"
                  value={form.comments}
                  onChange={e => this.onCommentsChange(e.target.value)}
                />
                <ActionButton
                  loading={loading}
                  error={
                    error && 'Ups! Nie udało się zapisać - spróbuj ponownie'
                  }
                  type="submit"
                  label="Gotowe!"
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
