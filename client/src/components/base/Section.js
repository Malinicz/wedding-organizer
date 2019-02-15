import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.baseSpacing}px;
`;
