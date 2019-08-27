import React, { Component } from 'react';
import styled from 'styles';

import { Icon } from 'components';

const GuestTypesHolder = styled.div`
  max-width: 450px;
`;

const AvatarHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  min-width: 80px;
  height: 80px;
  min-height: 80px;
  border-radius: 80px;
  background-color: ${({ theme }) => theme.colors.brightest};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease all;
`;

const GuestType = styled.div`
  display: inline-flex;
  margin-bottom: ${({ theme }) => theme.baseSpacing * 1.5}px;
  cursor: pointer;
  &:hover ${AvatarHolder} {
    background-color: ${({ theme }) => theme.colors.primaryDarker};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const NameHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ theme }) => theme.baseSpacing}px;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
  font-size: 1.1rem;
`;

const Subtitle = styled.div`
  font-size: 0.8em;
  color: ${({ theme }) => theme.colors.dark};
`;

export class GuestTypes extends Component {
  render() {
    const { activeType, handleChange } = this.props;

    return (
      <GuestTypesHolder>
        <GuestType
          isActive={activeType === 'guestSingle'}
          onClick={() => handleChange('guestSingle')}
        >
          <AvatarHolder>
            <Icon name="guestSingle" size={30} />
          </AvatarHolder>
          <NameHolder>
            <Title>Pojedynczy gość</Title>
            <Subtitle>
              np. Maciek, który jeszcze nie wie z kim przyjdzie
            </Subtitle>
          </NameHolder>
        </GuestType>
        <GuestType
          isActive={activeType === 'guestCouple'}
          onClick={() => handleChange('guestCouple')}
        >
          <AvatarHolder>
            <Icon name="guestCouple" size={41} />
          </AvatarHolder>
          <NameHolder>
            <Title>Para</Title>
            <Subtitle>
              np. Zosia i Marek - małżeństwo, które znasz od liceum
            </Subtitle>
          </NameHolder>
        </GuestType>
        <GuestType
          isActive={activeType === 'guestGroup'}
          onClick={() => handleChange('guestGroup')}
        >
          <AvatarHolder>
            <Icon name="guestGroup" size={43} />
          </AvatarHolder>
          <NameHolder>
            <Title>Para + dzieci</Title>
            <Subtitle>
              np. Wujek Gienek z Ciocią Janiną i synem Wojtkiem
            </Subtitle>
          </NameHolder>
        </GuestType>
      </GuestTypesHolder>
    );
  }
}
