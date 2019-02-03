import styled from 'styled-components';

import { Input } from './Input';

const ButtonBase = Input.withComponent('button');

export const Button = styled(ButtonBase)`
  padding: 0;
  background: -webkit-linear-gradient(
    top,
    #ffffff 0%,
    #f1f1f1 50%,
    #e1e1e1 51%,
    #f6f6f6 100%
  );
  font-weight: bold;
  font-size: 14px;
  transition: box-shadow 0.1s ease;

  &:active {
    box-shadow: none;
  }
`;
