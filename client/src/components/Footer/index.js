import React from 'react';
import styled from 'styles';
import { SocialMediaIcons } from './SocialMediaIcons';

const FooterHolder = styled.footer`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-top: 100px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.brightest};
`;

const CopyRights = styled.p`
  margin-top: 70px;
`;

export const Footer = () => {
  return (
    <FooterHolder>
      <SocialMediaIcons />
      <CopyRights>
        Wszelkie prawa zastrzeżone <br />© witajgosciu.pl 2019
      </CopyRights>
    </FooterHolder>
  );
};
