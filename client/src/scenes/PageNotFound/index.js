import React, { Component } from 'react';

import { InfoPage, InfoPageTitle, InfoPageSubtitle } from 'components';

export class PageNotFound extends Component {
  render() {
    return (
      <InfoPage>
        <InfoPageTitle>Hmm... 🤔</InfoPageTitle>
        <InfoPageSubtitle>
          Wygląda na to, że strona o podanym adresie nie istnieje.
        </InfoPageSubtitle>
      </InfoPage>
    );
  }
}
