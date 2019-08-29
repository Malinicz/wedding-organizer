import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styles';

import { Icon } from 'components';
import { Paragraph, RouterLink } from 'components/base';
import { AnimatedNumber } from './AnimatedNumber';

import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { ORGANISER_WEDDING } from 'constants/routes';

const GuestsSummaryHolder = styled.div`
  position: relative;
  padding-left: ${({ theme }) => theme.baseSpacing * 4}px;
  margin-top: 20px;
  font-size: 0.9em;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
`

const IconHolder = styled.div`
  position: absolute;
  top: -25px;
  left: 0;
  color: ${({ theme }) => theme.colors.primaryDarkest};
`;

export class GuestsSummary extends Component {
  render() {
    const { weddingId } = this.props;

    return (
      <Query query={GET_WEDDING_INITIAL_DATA} variables={{ id: weddingId }}>
        {({ data: { Wedding: wedding }, loading }) => {
          if (loading) return null;
          const { guestGroups } = wedding;

          const guestsCount = guestGroups.reduce(
            (result, next) => {
              const partnersCount = next.guests.reduce(
                (p, guest) =>
                  guest.allowPartner && guest.partner === null ? p + 1 : p,
                0
              );

              return (result = {
                all: result.all + next.guests.length,
                withPartners:
                  result.withPartners + next.guests.length + partnersCount,
              });
            },
            { all: 0, withPartners: 0 }
          );

          return (
            <GuestsSummaryHolder>
              <IconHolder>
                <Icon name="lightBulb" size={40} />
              </IconHolder>
              <Title>Czy wiesz, że...</Title>
              <Paragraph>
                {guestsCount.all === 0 ? (
                  <span>
                    Nie masz jeszcze żadnych Gości. Aby ich dodać, kliknij jeden z przycisków znajdujących się po lewej.
                  </span>
                ) : (
                    <span>
                      Masz już <AnimatedNumber value={guestsCount.all} />{' '}
                      {guestsCount.all === 1 ? 'Gościa' : 'Gości'} na swojej
                    liście.{' '}
                      {guestsCount.all < guestsCount.withPartners && (
                        <span>
                          Jeśli{' '}
                          {guestsCount.all === 1
                            ? 'przyjdzie z Osobą Towarzyszącą'
                            : 'wszyscy przyjdą z Osobami Towarzyszącymi'}
                          , będzie ich{' '}
                          <AnimatedNumber value={guestsCount.withPartners} />.
                        </span>
                      )}
                    </span>
                  )}
              </Paragraph>
              {guestsCount.all > 0 && (
                <Paragraph>
                  Przejdź do sekcji{' '}
                  <RouterLink
                    to={`${ORGANISER_WEDDING}/${weddingId}/lista-gosci`}
                  >
                    Lista Gości
                  </RouterLink>
                  , aby zobaczyć szczegóły.
                </Paragraph>
              )}
            </GuestsSummaryHolder>
          );
        }}
      </Query>
    );
  }
}
