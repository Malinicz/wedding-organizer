import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.baseSpacing * 4}px;
  max-width: 550px;
  border-radius: 8%;
  background-color: ${({ theme }) => theme.colors.brightest};
  box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.06);
`;
