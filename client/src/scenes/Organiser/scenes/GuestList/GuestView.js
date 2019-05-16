import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styles';

import { CheckboxGroup } from 'components';

import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { getRgba } from 'styles/helpers';

import { drinks as drinkList } from 'languages/pl/drinks';

const GuestViewHolder = styled.div`
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

class GuestViewComp extends Component {
  state = {
    filters: ['showPresentOnly'],
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
      this.filterByShowWithAccomodationOnly,
      this.filterByShowVegetariansOnly
    )(data);
  };

  filterByShowConfirmedInAppOnly = guests => {
    const { filters } = this.state;

    return filters.includes('showConfirmedInAppOnly')
      ? guests.filter(guest => !!guest.guestGroup.submissionDate)
      : guests;
  };

  filterByShowWithAccomodationOnly = guests => {
    const { filters } = this.state;
    return filters.includes('showWithAccomodationOnly')
      ? guests.filter(
          guest =>
            guest.guestGroup.allowAccomodation && guest.guestGroup.accomodation
        )
      : guests;
  };

  filterByShowVegetariansOnly = guests => {
    const { filters } = this.state;
    return filters.includes('showVegetariansOnly')
      ? guests.filter(guest => guest.isVegetarian)
      : guests;
  };

  filterByShowPresentOnly = guests => {
    const { filters } = this.state;
    return filters.includes('showPresentOnly')
      ? guests.filter(guest => guest.isPresent)
      : guests;
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
          const guests = guestGroups.reduce((result, nextGroup) => {
            return (result = result.concat(nextGroup.guests));
          }, []);

          const filteredGuests = this.applyFilters(guests);

          return (
            <GuestViewHolder>
              <ControllersHolder>
                <CheckboxGroup
                  columns={1}
                  activeValues={filters}
                  options={[
                    {
                      label: 'Tylko obecni',
                      value: 'showPresentOnly',
                    },
                    {
                      label: 'Tylko potwierdzone przez aplikację',
                      value: 'showConfirmedInAppOnly',
                    },
                    {
                      label: 'Tylko z zakwaterowaniem',
                      value: 'showWithAccomodationOnly',
                    },
                    {
                      label: 'Tylko wegetarianie',
                      value: 'showVegetariansOnly',
                    },
                  ]}
                  handleChange={e => this.onFiltersChange(e.target.value)}
                />
              </ControllersHolder>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell />
                    <TableHeadCell>imię</TableHeadCell>
                    <TableHeadCell>nazwisko</TableHeadCell>
                    <TableHeadCell>obecność</TableHeadCell>
                    <TableHeadCell>zakwaterowanie</TableHeadCell>
                    <TableHeadCell>wegetarianin</TableHeadCell>
                    <TableHeadCell>partner</TableHeadCell>
                    <TableHeadCell>napoje</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGuests.map(
                    (
                      {
                        id,
                        firstName,
                        lastName,
                        isPresent,
                        isVegetarian,
                        partner,
                        drinks,
                        guestGroup: {
                          submissionDate,
                          allowAccomodation,
                          accomodation,
                        },
                      },
                      index
                    ) => (
                      <TableRow key={id} isConfirmed={!!submissionDate}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{firstName}</TableCell>
                        <TableCell>{lastName}</TableCell>
                        <TableCell>{isPresent ? 'Tak' : 'Nie'}</TableCell>
                        <TableCell>
                          {allowAccomodation && accomodation ? 'Tak' : 'Nie'}
                        </TableCell>
                        <TableCell>{isVegetarian ? 'Tak' : 'Nie'}</TableCell>
                        <TableCell>
                          {!!partner
                            ? `${partner.firstName} ${partner.lastName}`
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {drinks
                            .map(drink => drinkList[drink.name])
                            .join(', ')}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </GuestViewHolder>
          );
        }}
      </Query>
    );
  }
}

export const GuestView = withRouter(GuestViewComp);
