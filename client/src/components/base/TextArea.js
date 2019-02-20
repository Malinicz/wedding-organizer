import styled from 'styled-components';

import { Input } from './Input';

const TextareaBase = Input.withComponent('textarea');

export const TextArea = styled(TextareaBase)`
  resize: vertical;
  min-height: 150px;
  border: ${({ theme }) => `2px solid ${theme.colors.primaryDarker}`};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 15px;
`;
