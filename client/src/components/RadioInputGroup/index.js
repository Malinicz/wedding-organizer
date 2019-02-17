import React, { Component } from 'react';

import { InputGroupLabel, InputGroupHolder } from 'components/base';
import { RadioInputStandardView } from './RadioInputStandardView';
import { RadioInputTableView } from './RadioInputTableView';

export class RadioInputGroup extends Component {
  render() {
    const {
      label,
      options,
      handleChange,
      activeValue,
      columns,
      name,
    } = this.props;

    return (
      <InputGroupHolder>
        <InputGroupLabel>{label}</InputGroupLabel>
        {columns ? (
          <RadioInputTableView
            name={name}
            columns={columns}
            options={options}
            activeValue={activeValue}
            handleChange={handleChange}
          />
        ) : (
          <RadioInputStandardView
            name={name}
            options={options}
            activeValue={activeValue}
            handleChange={handleChange}
          />
        )}
      </InputGroupHolder>
    );
  }
}
