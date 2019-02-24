import React, { Component } from 'react';

import { InfoPage, InfoPageTitle, InfoPageSubtitle } from 'components';

export class FormSubmissionSuccess extends Component {
  render() {
    return (
      <InfoPage>
        <InfoPageTitle>Dzięki!</InfoPageTitle>
        <InfoPageSubtitle>
          Formularz został wysłany{' '}
          <span role="img" aria-label="sukces">
            🎉
          </span>
          . Jeśli coś się zmieni, zawsze można tu wrócić i wysłać go ponownie
          😎.
        </InfoPageSubtitle>
      </InfoPage>
    );
  }
}
