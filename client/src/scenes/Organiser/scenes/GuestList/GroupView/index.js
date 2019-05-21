import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styles';

import { CheckboxGroup } from 'components';
import {
  Ellipsis,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableCell,
  TableBody,
} from 'components/base';

import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import {
  filterByShowConfirmedOnly,
  filterByShowWithAccomodationOnly,
  filterByShowUnconfirmedOnly,
  filterByShowDraftsOnly,
} from './filterFunctions';

import { ORGANISER_WEDDING } from 'constants/routes';

import { pipe } from '../utils';

const GroupViewHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const ControllersHolder = styled.div`
  display: flex;
  padding-bottom: 30px;
`;

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
    const filterConfig = {
      showConfirmedOnly: filterByShowConfirmedOnly,
      showWithAccomodationOnly: filterByShowWithAccomodationOnly,
      showUnconfirmedOnly: filterByShowUnconfirmedOnly,
      showDraftsOnly: filterByShowDraftsOnly,
    };

    const { filters } = this.state;
    const filterFns = filters.map(filterName => filterConfig[filterName]);

    return pipe(...filterFns)(data);
  };

  render() {
    const {
      history,
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

          const filterOptions = [
            {
              label: 'Tylko potwierdzone',
              value: 'showConfirmedOnly',
            },
            {
              label: 'Tylko niepotwierdzone',
              value: 'showUnconfirmedOnly',
            },
            {
              label: 'Tylko z zakwaterowaniem',
              value: 'showWithAccomodationOnly',
            },
            {
              label: 'Tylko wersje robocze',
              value: 'showDraftsOnly',
            },
          ];

          return (
            <GroupViewHolder>
              <ControllersHolder>
                <CheckboxGroup
                  label="Filtry"
                  columns={1}
                  activeValues={filters}
                  options={filterOptions}
                  handleChange={e => this.onFiltersChange(e.target.value)}
                />
              </ControllersHolder>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell />
                    <TableHeadCell>nazwa</TableHeadCell>
                    <TableHeadCell>kod</TableHeadCell>
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
                        id: groupId,
                        name,
                        code,
                        contactEmail,
                        submissionDate,
                        manualSubmissionDate,
                        allowAccomodation,
                        accomodation,
                        comments,
                        guests,
                      },
                      index
                    ) => {
                      const isConfirmed =
                        submissionDate || manualSubmissionDate;

                      return (
                        <TableRow
                          key={groupId}
                          isGrayedOut={!isConfirmed}
                          onClick={() =>
                            history.push(
                              `${ORGANISER_WEDDING}/${weddingId}/grupa/${groupId}`
                            )
                          }
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell>{code}</TableCell>
                          <TableCell>{contactEmail}</TableCell>
                          <TableCell>
                            {allowAccomodation && accomodation ? 'Tak' : 'Nie'}
                          </TableCell>
                          <TableCell>
                            {isConfirmed
                              ? guests.filter(guest => guest.isPresent).length
                              : '-'}
                          </TableCell>
                          <TableCell title={comments}>
                            <Ellipsis>{comments}</Ellipsis>
                          </TableCell>
                        </TableRow>
                      );
                    }
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
