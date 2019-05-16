import React, { Component } from 'react';
import styled from 'styles';

import { GroupView } from './GroupView';
import { GuestView } from './GuestView';
import { SegmentedButton } from 'components';

const GuestListHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

export class GuestList extends Component {
  state = {
    activeView: 'guest',
  };

  onViewTypeClick = activeView => {
    this.setState({ activeView });
  };

  render() {
    const { activeView } = this.state;

    return (
      <GuestListHolder>
        <SegmentedButton
          width={250}
          segments={[
            { label: 'Pokaż gości', value: 'guest' },
            { label: 'Pokaż grupy', value: 'group' },
          ]}
          activeLink={activeView}
          handleButtonClick={this.onViewTypeClick}
        />
        {activeView === 'guest' ? <GuestView /> : <GroupView />}
      </GuestListHolder>
    );
  }
}
