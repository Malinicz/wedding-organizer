import styled from 'styles';
import { H2 } from './Headings';

export const SectionSubtitle = styled(H2)`
  margin-bottom: ${({ theme }) => theme.baseSpacing * 4}px;
`;
