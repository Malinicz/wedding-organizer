import styled from 'styles';
import { getRgba } from 'styles/helpers';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 8px;
  font-size: 0.9em;
`;

export const TableHeadCell = styled(TableCell.withComponent('th'))`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
  text-align: left;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.primaryDarkest}`};
`;

export const TableRow = styled.tr`
  & > td {
    color: ${({ theme, isGrayedOut }) =>
      isGrayedOut ? getRgba(theme.colors.darkest, 0.3) : 'inherit'};
  }

  &:nth-child(2n) {
    background-color: ${({ theme }) =>
      getRgba(theme.colors.primaryDarker, 0.2)};
  }

  &:hover {
    & > td {
      background-color: ${({ theme }) =>
        getRgba(theme.colors.primaryDarker, 1)};
    }
  }
`;
