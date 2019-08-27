import React from 'react';
import styled from 'styles';
import moment, { now } from 'moment';

import { Icon } from 'components';

const ActivityLogHolder = styled.div`
  position: relative;
  padding-left: ${({ theme }) => theme.baseSpacing * 4}px;
  margin-top: 50px;
  font-size: 0.9em;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
`

const IconHolder = styled.div`
  position: absolute;
  top: -15px;
  left: 3px;
  color: ${({ theme }) => theme.colors.primaryDarkest};
`;

const List = styled.ul`
  padding: 0;
`

const ListItem = styled.li`
  list-style-type: none;
  padding-bottom: 0.2rem;
`

const Time = styled.span`
  color: ${({ theme }) => theme.colors.primaryDarkest};
`

export const ActivityLog = ({ list }) => {
  if (!list || list.length === 0) return null;

  return <ActivityLogHolder>
    <IconHolder>
      <Icon name="diary" size={35} />
    </IconHolder>
    <Title>Dziennik aktywności</Title>
    <List>
      {list.map(listItem => <ListItem key={listItem.time}><Time>{moment(listItem.time).format('HH:mm')}</Time>{' '}{listItem.description}</ListItem>)}
    </List>
  </ActivityLogHolder>

}
