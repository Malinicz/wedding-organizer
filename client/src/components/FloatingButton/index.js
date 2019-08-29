import React from 'react';
import styled from 'styles';

import { Icon } from 'components';

const FloatingButtonHolder = styled.div`
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
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95) rotate(45deg);
  }
`;

export const FloatingButton = ({ name = 'plus', handleClick, ...props }) => {
  return (
    <FloatingButtonHolder onClick={handleClick} {...props}>
      <Icon name={name} size={20} marginTop={5} />
    </FloatingButtonHolder>
  );
};
