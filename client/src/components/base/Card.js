import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.baseSpacing * 4}px;
  width: 100%;
  max-width: 550px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.brightest};
  box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.06);

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    padding: ${({ theme }) =>
      `${theme.baseSpacing * 3}px ${theme.baseSpacing * 2}px`};
  }
`;
