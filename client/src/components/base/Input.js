import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  min-height: 50px;
  margin-bottom: 30px;
  padding: 0 4px;
  font-size: 16px;
  border: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.primaryDarker}`};
  background-color: ${({ theme }) => theme.colors.brightest};
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.brighter};
  }
`;
