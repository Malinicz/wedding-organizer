import React, { Component } from 'react';
import styled, { keyframes } from 'styles';

import { Card, Button, H2 } from 'components/base';
import {
  RadioInputGroup,
  CheckboxGroup,
  Icon,
  FloatingButton,
} from 'components';

export const RADIO_INPUT_TRUE_FALSE_OPTIONS = [
  { value: true, label: 'Tak' },
  { value: false, label: 'Nie' },
];

const guestCardAnimation = keyframes`
  from { transform: scale3d(0.9,0.9,0.9) }
  to { transform: scale3d(1,1,1)}
`;

const GuestCardHolder = styled(Card)`
  width: auto;
  margin: 30px 30px 60px 30px;
  transform: scale3d(0.9, 0.9, 0.9);
  animation: ${guestCardAnimation} 1s ease;
  animation-fill-mode: forwards;
  animation-delay: ${({ animationDelay }) => animationDelay}s;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    width: 100%;
    margin: 0 0 100px 0;
  }
`;

const GuestName = styled(H2)`
  position: absolute;
  top: -0.25em;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  font-size: 2.5em;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    font-size: 2.2em;
  }
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

const RemovePartnerIcon = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  color: ${({ theme }) => theme.colors.brightest};
  background-color: ${({ theme }) => theme.colors.darkest};
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  &:active {
    transform: scale(0.95) rotate(45deg);
  }
`;

export class GuestCard extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.guest !== this.props.guest;
  }

  render() {
    const {
      guest,
      drinkOptions,
      handleRadioInputChange,
      handleDrinksChange,
      handleIsDrinkingAlcoholChange,
      handleAddPartnerModalOpen,
      handleDeletePartnerModalOpen,
      animationDelay,
    } = this.props;

    return (
      <>
        <GuestCardHolder animationDelay={animationDelay}>
          <GuestName>{guest.firstName}</GuestName>
          <RadioInputGroup
            label="Czy potwierdzasz obecność?"
            name={`${guest.id}-isPresent`}
            activeValue={guest.isPresent}
            options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
            handleChange={e =>
              handleRadioInputChange(e.target.value, guest.id, 'isPresent')
            }
          />
          <RadioInputGroup
            label="Czy jesteś wegetarianinem?"
            name={`${guest.id}-isVegetarian`}
            activeValue={guest.isVegetarian}
            options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
            handleChange={e =>
              handleRadioInputChange(e.target.value, guest.id, 'isVegetarian')
            }
          />
          <RadioInputGroup
            label="Czy napijesz się alkoholu?"
            name={`${guest.id}-isDrinkingAlcohol`}
            activeValue={guest.isDrinkingAlcohol}
            options={RADIO_INPUT_TRUE_FALSE_OPTIONS}
            handleChange={e =>
              handleIsDrinkingAlcoholChange(e.target.value, guest.id)
            }
          />
          <CheckboxGroup
            label="Czego się napijesz?"
            columns={3}
            disabled={!guest.isDrinkingAlcohol}
            activeValues={guest.drinks.map(drink => drink.id)}
            options={drinkOptions}
            handleChange={e => handleDrinksChange(e.target.value, guest.id)}
          />
          {guest.allowPartner && !guest.partner && (
            <AddPartnerHolder>
              <PlusButton
                type="button"
                onClick={() => handleAddPartnerModalOpen(guest)}
              >
                <Icon name="plus" size={25} marginTop={5} />
              </PlusButton>
              <AddPartnerText>Dodaj osobę towarzyszącą</AddPartnerText>
            </AddPartnerHolder>
          )}
          {!guest.allowPartner && guest.partner && (
            <FloatingButton
              handleClick={() => handleDeletePartnerModalOpen(guest)}
            />
          )}
        </GuestCardHolder>
      </>
    );
  }
}
