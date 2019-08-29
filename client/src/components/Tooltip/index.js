import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'components';

const TooltipHolder = styled.div`
  position: relative;
  display: inline-flex;
  transform: translateY(2px);
`

const InfoHolder = styled.div`
  position: absolute;
  bottom: 33px;
  right: -9px;
  width: 200px;
  transform: scale(0);
  opacity: 0;
  padding: ${({ theme }) => theme.baseSpacing}px;
  color: ${({ theme }) => theme.colors.darker}; 
  font-size: 0.7rem;
  line-height: 0.9rem;
  background-color: ${({ theme }) => theme.colors.brightest}; 
  border-radius: 15px;
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s ease, opacity 0.1s ease;

  &:before {
    content:'';
    position:absolute;
    bottom: -9px;
    display:block;
    width:0;
    height:0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: ${({ theme }) => `10px solid ${theme.colors.brightest}`};
    right: 12px;
    transform: rotate(90deg);
  }  
`

const IconHolder = styled.div`
  color: ${({ theme }) => theme.colors.primaryDarkest};
  margin-left: 5px;
  cursor: pointer;

  &:hover ${InfoHolder} {
    transform: scale(1);
    opacity: 1;
  }
}
`

export const Tooltip = ({ text }) => {
  if (!text) return null;

  return (
    <TooltipHolder>
      <IconHolder>
        <Icon name="info" size={15} />
        <InfoHolder>{text}</InfoHolder>
      </IconHolder>
    </TooltipHolder>
  );
}