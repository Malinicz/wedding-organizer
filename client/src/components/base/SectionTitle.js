import styled from 'styles';
import { H1 } from './Headings';

export const SectionTitle = styled(H1)`
  margin-bottom: ${({ theme }) => theme.baseSpacing * 4}px;
`;
