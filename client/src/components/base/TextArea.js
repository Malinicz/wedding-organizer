import styled from 'styled-components';

import { Input } from './Input';

const TextareaBase = Input.withComponent('textarea');

export const TextArea = styled(TextareaBase)`
  resize: vertical;
  min-height: 150px;
  border: ${({ theme }) => `2px solid ${theme.colors.primaryDarker}`};
  padding: 15px;
`;
