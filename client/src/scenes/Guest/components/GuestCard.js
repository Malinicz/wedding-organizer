import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styles';

import { Card, Button, H2 } from 'components/base';
import { RadioInputGroup, CheckboxGroup, Icon } from 'components';

import { ADD_PARTNER_MUTATION } from 'graphql/mutations';
import { GET_GUEST_INITIAL_DATA } from 'graphql/queries';

export const RADIO_INPUT_TRUE_FALSE_OPTIONS = [
  { value: true, label: 'Tak' },
  { value: false, label: 'Nie' },
];

const GuestCardHolder = styled(Card)`
  margin: 30px 30px 60px 30px;
`;

const GuestName = styled(H2)`
  position: absolute;
  top: -0.25em;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  font-size: 2.5em;
`;

const AddPartnerHolder = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddPartnerText = styled.p`
  font-size: 13px;
  white-space: nowrap;
  margin: 5px 0 0 0;
`;

const PlusButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-bottom: 0;

  &:active {
    transform: scale(0.95);
  }
`;

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
      <GuestCardHolder>
        <GuestName>{guest.name}</GuestName>
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
              <AddPartnerHolder>
                <PlusButton type="button" onClick={addPartner}>
                  <Icon name="plus" size={25} marginTop={5} />
                </PlusButton>
                <AddPartnerText>Dodaj osobę towarzyszącą</AddPartnerText>
              </AddPartnerHolder>
            )}
          </Mutation>
        )}
      </GuestCardHolder>
    );
  }
}
