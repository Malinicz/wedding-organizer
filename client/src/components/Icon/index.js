import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styles';
import {
  LoaderIcon,
  PlusIcon,
  CheckmarkIcon,
  ArrowDownIcon,
  NotepadIcon,
  PiggyBankIcon,
  ContactIcon,
  AlarmClockIcon,
  AddUserIcon,
  ListIcon,
  StatsIcon,
  AccountSettingsIcon,
  ConfigurationIcon,
  LogOutIcon,
  LocationIcon,
  GuestSingleIcon,
  GuestCoupleIcon,
  GuestGroupIcon,
  LightBulbIcon,
  DiaryIcon
} from './svgIcons';

const icons = {
  loader: <LoaderIcon />,
  plus: <PlusIcon />,
  checkmark: <CheckmarkIcon />,
  arrowDown: <ArrowDownIcon />,
  notepad: <NotepadIcon />,
  piggyBank: <PiggyBankIcon />,
  contact: <ContactIcon />,
  alarmClock: <AlarmClockIcon />,
  addUser: <AddUserIcon />,
  list: <ListIcon />,
  stats: <StatsIcon />,
  accountSettings: <AccountSettingsIcon />,
  configuration: <ConfigurationIcon />,
  logOut: <LogOutIcon />,
  location: <LocationIcon />,
  guestSingle: <GuestSingleIcon />,
  guestCouple: <GuestCoupleIcon />,
  guestGroup: <GuestGroupIcon />,
  lightBulb: <LightBulbIcon />,
  diary: <DiaryIcon />
};

const IconHolder = styled.div`
  display: inline-block;
  margin-top: ${({ marginTop }) => marginTop || 3}px;
  width: ${({ size }) => size}px;
  fill: currentColor;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;

export const Icon = ({
  name,
  size = 25,
  marginRight,
  marginLeft,
  marginTop,
  style,
}) => {
  return (
    <IconHolder
      size={size}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      style={style}
    >
      {icons[name]}
    </IconHolder>
  );
};

Icon.defaultProps = {
  marginLeft: 0,
  marginRight: 0,
  marginTop: 3,
  size: 25,
};

Icon.propTypes = {
  name: string.isRequired,
  size: number,
  marginRight: number,
  marginLeft: number,
  marginTop: number,
};
