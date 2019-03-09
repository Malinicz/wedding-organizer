import React from 'react';
import styled from 'styles';

import { Icon } from 'components';

const LocationInfoHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  margin: 0 15px;
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

export const LocationInfo = () => {
  return (
    <LocationInfoHolder>
      <Location>
        <LocationDetailsHolder>
          <LocationDetailsTitle>Miejsce ślubu</LocationDetailsTitle>
          <LocationDetailsText>
            Kościół Rzymskokatolicki pw Najświętszego Serca Pana Jezusa
          </LocationDetailsText>

          <LocationDetailsText>ul. Saska 2, Kraków</LocationDetailsText>
        </LocationDetailsHolder>
        <ShowLocationButton
          href="https://www.google.pl/maps/place/Ko%C5%9Bci%C3%B3%C5%82+Sercan%C3%B3w+Saska/@50.0441991,19.9819559,17z/data=!3m1!4b1!4m5!3m4!1s0x4716454e7588f9b1:0x30d4c874216ee0ca!8m2!3d50.0441991!4d19.9841446?hl=pl"
          target="_blank"
        >
          <Icon name="location" size={18} marginRight={5} />
          Zobacz na mapie
        </ShowLocationButton>
      </Location>
      <Location>
        <LocationDetailsHolder>
          <LocationDetailsTitle>Miejsce wesela</LocationDetailsTitle>
          <LocationDetailsText>Brzoskwinia Ogród</LocationDetailsText>

          <LocationDetailsText>
            Brzoskwinia 249, Brzoskwinia
          </LocationDetailsText>
        </LocationDetailsHolder>
        <ShowLocationButton
          href="https://www.google.pl/maps/place/Brzoskwinia+Ogr%C3%B3d/@50.0953434,19.7310951,17z/data=!4m5!3m4!1s0x4716f63c6062059d:0xfdd43e2e485acd9a!8m2!3d50.09534!4d19.7332838?hl=pl"
          target="_blank"
        >
          <Icon name="location" size={18} marginRight={5} />
          Zobacz na mapie
        </ShowLocationButton>
      </Location>
    </LocationInfoHolder>
  );
};
