import React, { Component } from 'react';

import { RouterLink } from 'components/base';
import { InfoPage, InfoPageTitle, InfoPageSubtitle } from 'components';

import { HOME } from 'constants/routes';

export class PageNotFound extends Component {
  render() {
    return (
      <InfoPage>
        <InfoPageTitle>
          Hmm...{' '}
          <span role="img" aria-label="zastanawiająca się buźka">
            🤔
          </span>
        </InfoPageTitle>
        <InfoPageSubtitle>
          Wygląda na to, że strona o podanym adresie nie istnieje.
        </InfoPageSubtitle>
        <RouterLink to={HOME}>Wróć na stronę główną</RouterLink>
      </InfoPage>
    );
  }
}
