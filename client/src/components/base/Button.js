import styled from 'styled-components';

import { Input } from './Input';

const ButtonBase = Input.withComponent('button');

export const Button = styled(ButtonBase)`
  padding: 0;
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  color: ${({ theme }) => theme.colors.brightest};
  font-size: 1.7em;
  background-color: ${({ theme }) => theme.colors.primaryDarker};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.brighter};
  }
`;

export const RoundButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-bottom: 0;

  &:active {
    transform: scale(0.95);
  }
`;
