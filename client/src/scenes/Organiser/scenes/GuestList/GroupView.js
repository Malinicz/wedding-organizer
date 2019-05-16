import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styles';

import { CheckboxGroup } from 'components';
import { Ellipsis } from 'components/base';

import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { getRgba } from 'styles/helpers';

const GroupViewHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const ControllersHolder = styled.div`
  display: flex;
  padding-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 8px;
`;

const TableHeadCell = styled(TableCell.withComponent('th'))`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
  text-align: left;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.primaryDarkest}`};
`;

const TableRow = styled.tr`
  & > td {
    color: ${({ theme, isConfirmed }) =>
      isConfirmed ? 'inherit' : getRgba(theme.colors.darkest, 0.3)};
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

const pipe = (...functions) => data => {
  return functions.reduce((a, b) => b(a), data);
};

class GroupViewComp extends Component {
  state = {
    filters: [],
  };

  onFiltersChange = filterName => {
    this.setState(prevState => ({
      filters: prevState.filters.includes(filterName)
        ? prevState.filters.filter(f => f !== filterName)
        : [...prevState.filters, filterName],
    }));
  };

  applyFilters = data => {
    return pipe(
      this.filterByShowConfirmedInAppOnly,
      this.filterByShowWithAccomodationOnly
    )(data);
  };

  filterByShowConfirmedInAppOnly = guestGroups => {
    const { filters } = this.state;
    return filters.includes('showConfirmedInAppOnly')
      ? guestGroups.filter(guestGroup => !!guestGroup.submissionDate)
      : guestGroups;
  };

  filterByShowWithAccomodationOnly = guestGroups => {
    const { filters } = this.state;
    return filters.includes('showWithAccomodationOnly')
      ? guestGroups.filter(
          guestGroup => guestGroup.allowAccomodation && guestGroup.accomodation
        )
      : guestGroups;
  };

  render() {
    const {
      match: {
        params: { id: weddingId },
      },
    } = this.props;
    const { filters } = this.state;

    return (
      <Query query={GET_WEDDING_INITIAL_DATA} variables={{ id: weddingId }}>
        {({ data: { Wedding: wedding } }) => {
          const guestGroups = wedding.guestGroups;

          const filteredGroups = this.applyFilters(guestGroups);

          return (
            <GroupViewHolder>
              <ControllersHolder>
                <CheckboxGroup
                  label="Filtry"
                  columns={1}
                  activeValues={filters}
                  options={[
                    {
                      label: 'Tylko potwierdzone przez aplikację',
                      value: 'showConfirmedInAppOnly',
                    },
                    {
                      label: 'Tylko z zakwaterowaniem',
                      value: 'showWithAccomodationOnly',
                    },
                  ]}
                  handleChange={e => this.onFiltersChange(e.target.value)}
                />
              </ControllersHolder>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell />
                    <TableHeadCell>nazwa</TableHeadCell>
                    <TableHeadCell>email</TableHeadCell>
                    <TableHeadCell>zakwaterowanie</TableHeadCell>
                    <TableHeadCell>liczba obecnych</TableHeadCell>
                    <TableHeadCell>komentarze</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGroups.map(
                    (
                      {
                        id,
                        name,
                        contactEmail,
                        submissionDate,
                        allowAccomodation,
                        accomodation,
                        comments,
                        guests,
                      },
                      index
                    ) => (
                      <TableRow key={id} isConfirmed={!!submissionDate}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{contactEmail}</TableCell>
                        <TableCell>
                          {allowAccomodation && accomodation ? 'Tak' : 'Nie'}
                        </TableCell>
                        <TableCell>
                          {!!submissionDate
                            ? guests.filter(guest => guest.isPresent).length
                            : '-'}
                        </TableCell>
                        <TableCell title={comments}>
                          <Ellipsis>{comments}</Ellipsis>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </GroupViewHolder>
          );
        }}
      </Query>
    );
  }
}

export const GroupView = withRouter(GroupViewComp);
