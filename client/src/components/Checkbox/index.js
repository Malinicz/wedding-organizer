import React, { Component } from 'react';
import styled from 'styles';

import checkmark from './checkmark.svg';

const CheckboxHolder = styled.div`
  display: inline-block;
  vertical-align: middle;
  // Depends on font
  margin-top: -4px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Checkmark = styled.img`
  width: 15px;
`;

const StyledCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  border: ${({ theme, disabled }) =>
    disabled
      ? `2px solid ${theme.colors.brighter}`
      : `2px solid ${theme.colors.primaryDarker}`};
  background: ${({ checked, disabled, theme }) =>
    checked && !disabled ? theme.colors.primaryDarker : theme.colors.brightest};
  transition: all 0.15s;

  ${Checkmark} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

const CheckboxText = styled.span`
  margin-left: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  padding: 5px 0;
  margin-bottom: ${({ theme, dense }) => (dense ? 0 : theme.baseSpacing)}px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: color 0.15s;
  color: ${({ theme, disabled }) => disabled ? theme.colors.brighter : 'inherit'};
  cursor: pointer;

  &:active ${StyledCheckbox} {
    transform: scale(0.9);
  }
`;

export class Checkbox extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.checked !== this.props.checked ||
      nextProps.disabled !== this.props.disabled
    );
  }

  render() {
    const { checked, label, style, disabled, dense = true, adornment } = this.props;

    return (
      <CheckboxLabel style={style} disabled={disabled} dense={dense}>
        <CheckboxHolder>
          <HiddenCheckbox checked={checked} {...this.props} />
          <StyledCheckbox checked={checked} disabled={disabled}>
            <Checkmark src={checkmark} />
          </StyledCheckbox>
        </CheckboxHolder>
        <CheckboxText>{label}</CheckboxText>
        {disabled ? null : adornment}
      </CheckboxLabel>
    );
  }
}
