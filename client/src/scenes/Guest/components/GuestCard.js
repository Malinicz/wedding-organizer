import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { RadioInputGroup, CheckboxGroup } from 'components';

import { ADD_PARTNER_MUTATION } from '../../../graphql/mutations';
import { GET_GUEST_INITIAL_DATA } from '../../../graphql/queries';

export const RADIO_INPUT_TRUE_FALSE_OPTIONS = [
  { value: true, label: 'Tak' },
  { value: false, label: 'Nie' },
];

export class GuestCard extends Component {
  render() {
    const {
      guest,
      guestGroupId,
      drinkOptions,
      handleRadioInputChange,
      handleDrinksChange,
    } = this.props;

    return (
      <div style={{ border: '1px solid black' }}>
        <h2>{guest.name}</h2>
        <RadioInputGroup
          label="Obecność"
          name={`${guest.id}-isPresent`}
          activeValue={guest.isPresent}
          options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
          handleChange={e =>
            handleRadioInputChange(guest.id, 'isPresent', e.target.value)
          }
        />
        <RadioInputGroup
          label="Dania wegetariańskie"
          name={`${guest.id}-isVegetarian`}
          activeValue={guest.isVegetarian}
          options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
          handleChange={e =>
            handleRadioInputChange(guest.id, 'isVegetarian', e.target.value)
          }
        />
        <CheckboxGroup
          label="Preferowane alkohole"
          activeValues={guest.drinks.map(drink => drink.id)}
          options={drinkOptions}
          handleChange={e => handleDrinksChange(guest.id, e.target.value)}
        />
        {guest.allowPartner && (
          <Mutation
            mutation={ADD_PARTNER_MUTATION}
            variables={{ guestGroupId, partnerName: 'test' }}
            refetchQueries={[
              {
                query: GET_GUEST_INITIAL_DATA,
                variables: { id: guestGroupId },
              },
            ]}
          >
            {addPartner => (
              <button type="button" onClick={addPartner}>
                Dodaj osobę towarzyszącą
              </button>
            )}
          </Mutation>
        )}
      </div>
    );
  }
}
