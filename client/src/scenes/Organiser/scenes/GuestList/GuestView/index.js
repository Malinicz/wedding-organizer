import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styles';

import { CheckboxGroup } from 'components';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from 'components/base';

import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { drinks as drinkList } from 'languages/pl/drinks';
import {
  filterByShowPresentOnly,
  filterByShowConfirmedOnly,
  filterByShowWithAccomodationOnly,
  filterByShowVegetariansOnly,
  filterByShowUnconfirmedOnly,
  filterByShowDraftsOnly,
  filterByShowWithTransportOnly,
  filterByShowWithoutTransportOnly,
} from './filterFunctions';

import { pipe } from '../utils';

const GuestViewHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const ControllersHolder = styled.div`
  display: flex;
  padding-bottom: 30px;
`;

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
    const filterConfig = {
      showPresentOnly: filterByShowPresentOnly,
      showConfirmedOnly: filterByShowConfirmedOnly,
      showWithAccomodationOnly: filterByShowWithAccomodationOnly,
      showVegetariansOnly: filterByShowVegetariansOnly,
      showUnconfirmedOnly: filterByShowUnconfirmedOnly,
      showDraftsOnly: filterByShowDraftsOnly,
      showWithTransportOnly: filterByShowWithTransportOnly,
      showWithoutTransportOnly: filterByShowWithoutTransportOnly,
    };

    const { filters } = this.state;
    const filterFns = filters.map(filterName => filterConfig[filterName]);

    return pipe(...filterFns)(data);
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

          const filtersOptions = [
            {
              label: 'Tylko obecni',
              value: 'showPresentOnly',
            },
            {
              label: 'Tylko niepotwierdzone',
              value: 'showUnconfirmedOnly',
            },
            {
              label: 'Tylko potwierdzone',
              value: 'showConfirmedOnly',
            },
            {
              label: 'Tylko z zakwaterowaniem',
              value: 'showWithAccomodationOnly',
            },
            {
              label: 'Tylko wegetarianie',
              value: 'showVegetariansOnly',
            },
            {
              label: 'Tylko wersje robocze',
              value: 'showDraftsOnly',
            },
            {
              label: 'Tylko z transportem',
              value: 'showWithTransportOnly',
            },
            {
              label: 'Tylko bez transportu',
              value: 'showWithoutTransportOnly',
            },
          ];

          return (
            <GuestViewHolder>
              <ControllersHolder>
                <CheckboxGroup
                  columns={1}
                  activeValues={filters}
                  options={filtersOptions}
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
                          manualSubmissionDate,
                          allowAccomodation,
                          accomodation,
                        },
                      },
                      index
                    ) => {
                      const isConfirmed =
                        submissionDate || manualSubmissionDate;

                      return (
                        <TableRow key={id} isGrayedOut={!isConfirmed}>
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
                      );
                    }
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
