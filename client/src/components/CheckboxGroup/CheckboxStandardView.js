import React from 'react';
import styled from 'styles';

import { Checkbox } from 'components';

const Checkboxes = styled.div``;

export const CheckboxStandardView = ({
  options,
  activeValues,
  handleChange,
}) => {
  return (
    <Checkboxes>
      {options.map(option => {
        const isChecked = activeValues.includes(option.value);
        return (
          <Checkbox
            key={option.value}
            value={option.value}
            label={option.label}
            checked={isChecked}
            onChange={handleChange}
          />
        );
      })}
    </Checkboxes>
  );
};
