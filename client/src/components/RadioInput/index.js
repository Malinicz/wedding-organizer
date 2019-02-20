import React, { Component } from 'react';
import styled from 'styles';

const RadioInputHolder = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenRadioInput = styled.input.attrs({ type: 'radio' })`
  // Hide RadioInput visually but remain accessible to screen readers.
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

const ActivityIndicator = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 11px;
  background: ${({ theme }) => theme.colors.primaryDarker};
  transform: translate(5px, 5px);
`;

const StyledRadioInput = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  border: ${({ theme, disabled }) =>
    disabled
      ? `2px solid ${theme.colors.brighter}`
      : `2px solid ${theme.colors.primaryDarker}`};
  background: ${({ theme }) => theme.colors.brightest};
  transition: all 0.15s;

  ${ActivityIndicator} {
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
    background: ${({ theme, disabled }) =>
      disabled ? theme.colors.brighter : theme.colors.primaryDarker};
  }
`;

const RadioInputLabel = styled.label`
  display: inline-block;
  padding: 2px 0;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active ${StyledRadioInput} {
    transform: scale(0.9);
  }
`;

const RadioInputText = styled.span`
  margin: 0px 5px;
`;

export class RadioInput extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.isActive !== this.props.isActive ||
      nextProps.disabled !== this.props.disabled
    );
  }

  render() {
    const { isActive, label, style, disabled } = this.props;

    return (
      <RadioInputLabel style={style} disabled={disabled}>
        <RadioInputHolder>
          <HiddenRadioInput isActive={isActive} {...this.props} />
          <StyledRadioInput isActive={isActive} disabled={disabled}>
            <ActivityIndicator />
          </StyledRadioInput>
        </RadioInputHolder>
        <RadioInputText>{label}</RadioInputText>
      </RadioInputLabel>
    );
  }
}
