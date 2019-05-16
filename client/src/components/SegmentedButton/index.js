import React from 'react';
import styled from 'styles';
import { arrayOf, shape, string, number } from 'prop-types';

import { Icon } from 'components';
import { Button } from 'components/base';

const SegmentedButtonsHolder = styled.div`
  display: flex;
`;

const SegmentButton = styled(Button)`
  width: ${({ width }) => width || 200}px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.brightest : theme.colors.primaryDarkest};
  border-top: 2px solid ${({ theme }) => theme.colors.primaryDarker};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryDarker};
  border-right: 1px solid ${({ theme }) => theme.colors.primaryDarker};
  border-left: 1px solid ${({ theme }) => theme.colors.primaryDarker};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primaryDarker : 'transparent'};
  cursor: pointer;

  &:first-child {
    border-left: 2px solid ${({ theme }) => theme.colors.primaryDarker};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-right: 2px solid ${({ theme }) => theme.colors.primaryDarker};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:active {
    transform: none;
  }

  &:focus {
    z-index: 1;
  }
`;

export const SegmentedButton = ({
  segments,
  activeLink,
  buttonWidth,
  handleButtonClick,
}) => {
  return (
    <SegmentedButtonsHolder>
      {segments.map(segment => {
        const isActive = segment.value === activeLink;

        return (
          <SegmentButton
            key={segment.label}
            isActive={isActive}
            width={buttonWidth}
            onClick={() => handleButtonClick(segment.value)}
          >
            {segment.icon && (
              <Icon
                name={segment.icon}
                size={segment.iconSize}
                marginRight={5}
              />
            )}
            {segment.label}
          </SegmentButton>
        );
      })}
    </SegmentedButtonsHolder>
  );
};

SegmentedButton.defaultProps = {
  buttonWidth: 200,
};

SegmentedButton.propTypes = {
  segments: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
      icon: string,
      iconSize: number,
    })
  ).isRequired,
  activeLink: string.isRequired,
  buttonWidth: number,
};
