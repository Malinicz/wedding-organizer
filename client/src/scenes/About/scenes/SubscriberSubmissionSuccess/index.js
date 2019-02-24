import React, { Component } from 'react';

import { InfoPage, InfoPageTitle, InfoPageSubtitle } from 'components';

export class SubscriberSubmissionSuccess extends Component {
  render() {
    return (
      <InfoPage>
        <InfoPageTitle>Dzięki!</InfoPageTitle>
        <InfoPageSubtitle>
          Twój email został zapisany
          <span role="img" aria-label="sukces">
            🎉
          </span>
          . Cenimy prywatność, dlatego zapewniamy, że zostanie użyty tylko i
          wyłącznie do informowania Cię o istotnych kwestiach związanych z naszą
          aplikacją. Zero spamu!
        </InfoPageSubtitle>
      </InfoPage>
    );
  }
}
