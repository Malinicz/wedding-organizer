import React from 'react';
import styled from 'styles';

import { RadioInput } from 'components';

const RadioInputs = styled.div``;

export const RadioInputStandardView = ({
  options,
  activeValue,
  handleChange,
  name,
  disabled,
}) => {
  return (
    <RadioInputs>
      {options.map(option => {
        const isActive = activeValue === option.value;

        return (
          <RadioInput
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            isActive={isActive}
            onChange={handleChange}
            disabled={disabled}
          />
        );
      })}
    </RadioInputs>
  );
};
