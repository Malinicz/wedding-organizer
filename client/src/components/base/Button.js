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
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.99);
  }
`;
