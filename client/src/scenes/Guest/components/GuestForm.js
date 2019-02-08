import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { GuestCard } from './GuestCard';

import { SAVE_GUEST_GROUP_FORM } from 'graphql/mutations';

import { toBoolean } from 'utils/helpers';

import { pl } from 'languages';

export class GuestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        id: undefined,
        guests: [],
      },
    };
  }

  componentDidMount() {
    this.initializeForm();
  }

  componentDidUpdate(prevProps) {
    const prevGuestsLength = prevProps.guestGroup.guests.length;
    const currentGuestsLength = this.props.guestGroup.guests.length;

    if (currentGuestsLength !== prevGuestsLength) {
      this.initializeForm();
    }
  }

  initializeForm = () => {
    const { guestGroup } = this.props;
    this.setState({ form: guestGroup });
  };

  onRadioInputChange = (guestId, name, value) => {
    const { guests } = this.state.form;
    const updatedGuests = guests.map(guest =>
      guestId === guest.id ? { ...guest, [name]: toBoolean(value) } : guest
    );
    this.setState({ form: { ...this.state.form, guests: updatedGuests } });
  };

  onDrinksChange = (guestId, drinkId) => {
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

  render() {
    const {
      form,
      form: { guests, id: guestGroupId },
    } = this.state;
    const { drinkOptions } = this.props;

    console.log('form: ', this.state.form);

    return (
      <Mutation mutation={SAVE_GUEST_GROUP_FORM} variables={form}>
        {saveGuestGroupForm => (
          <form
            onSubmit={e => {
              e.preventDefault();
              saveGuestGroupForm();
            }}
          >
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
                  handleRadioInputChange={this.onRadioInputChange}
                  handleDrinksChange={this.onDrinksChange}
                />
              );
            })}
            <button type="submit">Zapisz</button>
          </form>
        )}
      </Mutation>
    );
  }
}
