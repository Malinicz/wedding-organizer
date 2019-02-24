import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  max-width: ${({ theme }) => theme.inputMaxWidth}px;
  height: 50px;
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
  -webkit-appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.brighter};
  }
`;

export const InputLabel = styled.label`
  display: inline-block;
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 4px;
  margin-left: 4px;
`;

export const InputGroupLabel = styled.div`
  display: block;
  margin-bottom: 4px;
  font-size: 1em;
  font-weight: bold;
`;

export const InputGroupHolder = styled.div.attrs(props => ({
  style: {
    color: props.disabled ? props.theme.colors.brighter : 'inherit',
  },
}))`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;
