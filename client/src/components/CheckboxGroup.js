import React, { Component } from 'react';
import styled from 'styled-components';

import { Checkbox } from 'components/base';

const CheckboxGroupHolder = styled.div``;

export class CheckboxGroup extends Component {
  render() {
    const { label, options, handleChange, activeValues } = this.props;

    return (
      <CheckboxGroupHolder>
        <div>{label}</div>
        <div>
          {options.map((option, index) => {
            const isChecked = activeValues.includes(option.value);

            return (
              <label key={`${index}-${option.value}`}>
                <Checkbox
                  type="checkbox"
                  value={option.value}
                  checked={isChecked}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </CheckboxGroupHolder>
    );
  }
}
