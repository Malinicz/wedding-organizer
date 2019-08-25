import React, { Component } from 'react';
import styled from 'styles';

import { Icon } from 'components';

const GuestTypesHolder = styled.div`
  max-width: 400px;
`;

const AvatarHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  transition: 0.3s ease all;
`;

const GuestType = styled.div`
  display: inline-flex;
  margin-bottom: ${({ theme }) => theme.baseSpacing}px;
  cursor: pointer;
  &:hover ${AvatarHolder} {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: scale(0.98);
  }

  ${AvatarHolder} {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.primaryDarker : theme.colors.brightest};
  }
`;

const NameHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ theme }) => theme.baseSpacing / 2}px;
`;

const Title = styled.div``;

const Subtitle = styled.div`
  font-size: 0.8em;
  color: ${({ theme }) => theme.colors.bright};
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
            <Icon name="guestSingle" size={25} />
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
            <Icon name="guestCouple" size={35} />
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
            <Icon name="guestGroup" size={35} />
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
