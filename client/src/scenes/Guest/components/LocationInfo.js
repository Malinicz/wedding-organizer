import React from 'react';
import styled from 'styles';

import { Icon } from 'components';

const LocationInfoHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  margin: 0 15px 30px 0;
`;

const LocationDetailsHolder = styled.div`
  text-align: center;
  margin-bottom: 15px;
`;

const LocationDetailsTitle = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
  margin-bottom: 10px;
`;

const LocationDetailsText = styled.div`
  font-size: 0.9em;
`;

const ShowLocationButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryDarkest};
`;

export const LocationInfo = ({ weddingCeremony, weddingParty }) => {
  return (
    <LocationInfoHolder>
      <Location>
        <LocationDetailsHolder>
          <LocationDetailsTitle>Miejsce ślubu</LocationDetailsTitle>
          <LocationDetailsText>{weddingCeremony.name}</LocationDetailsText>

          <LocationDetailsText>
            {weddingCeremony.street}, {weddingCeremony.city}
          </LocationDetailsText>
        </LocationDetailsHolder>
        <ShowLocationButton href={weddingCeremony.locationUrl} target="_blank">
          <Icon name="location" size={18} marginRight={5} />
          Zobacz na mapie
        </ShowLocationButton>
      </Location>
      <Location>
        <LocationDetailsHolder>
          <LocationDetailsTitle>Miejsce wesela</LocationDetailsTitle>
          <LocationDetailsText>{weddingParty.name}</LocationDetailsText>

          <LocationDetailsText>
            {weddingParty.street}, {weddingParty.city}
          </LocationDetailsText>
        </LocationDetailsHolder>
        <ShowLocationButton href={weddingParty.locationUrl} target="_blank">
          <Icon name="location" size={18} marginRight={5} />
          Zobacz na mapie
        </ShowLocationButton>
      </Location>
    </LocationInfoHolder>
  );
};
