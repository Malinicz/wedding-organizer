import React, { Component } from 'react';
import styled from 'styled-components';

import { InputRadio } from 'components/base';

const RadioInputGroupHolder = styled.div``;

export class RadioInputGroup extends Component {
  render() {
    const { name, label, options, handleChange, activeValue } = this.props;

    return (
      <RadioInputGroupHolder>
        <div>{label}</div>
        <div>
          {options.map((option, index) => {
            const isChecked = activeValue === option.value;

            return (
              <label key={`${index}-${option.value}`}>
                <InputRadio
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </RadioInputGroupHolder>
    );
  }
}
