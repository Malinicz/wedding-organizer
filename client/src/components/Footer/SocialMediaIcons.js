import React from 'react';
import styled from 'styles';

import { getRgba } from 'styles/helpers';

const facebookLogo = require('assets/logo-facebook.svg');
const googlePlusLogo = require('assets/logo-instagram.svg');
const youTubeLogo = require('assets/logo-youtube.svg');

const SocialMediaIconsHolder = styled.div`
  position: absolute;
  top: -38px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const IconHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 55px;
  height: 55px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.brightest};
  box-shadow: ${({ theme }) =>
    `0 2px 3px 0px ${getRgba(theme.colors.darkest, 0.16)}`};
  transition: 0.2s ease transform, 0.2s ease box-shadow;
`;

const FacebookIcon = styled.img`
  width: 13px;
`;

const InstagramIcon = styled.img`
  width: 29px;
`;

const YouTubeIcon = styled.img`
  width: 30px;
`;

const StyledLinkWrapper = styled.a``;

export const SocialMediaIcons = () => {
  return (
    <SocialMediaIconsHolder>
      <StyledLinkWrapper href="#" target="_blank">
        <IconHolder>
          <FacebookIcon src={facebookLogo} />
        </IconHolder>
      </StyledLinkWrapper>
      <StyledLinkWrapper href="#" target="_blank">
        <IconHolder>
          <InstagramIcon src={googlePlusLogo} />
        </IconHolder>
      </StyledLinkWrapper>
      <StyledLinkWrapper href="#" target="_blank">
        <IconHolder>
          <YouTubeIcon src={youTubeLogo} />
        </IconHolder>
      </StyledLinkWrapper>
    </SocialMediaIconsHolder>
  );
};
