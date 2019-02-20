import React, { Component } from 'react';

import { InputGroupLabel, InputGroupHolder } from 'components/base';
import { RadioInputStandardView } from './RadioInputStandardView';
import { RadioInputTableView } from './RadioInputTableView';

export class RadioInputGroup extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.activeValue !== this.props.activeValue ||
      nextProps.disabled !== this.props.disabled
    );
  }

  render() {
    const {
      label,
      options,
      handleChange,
      activeValue,
      columns,
      name,
      disabled,
    } = this.props;

    return (
      <InputGroupHolder disabled={disabled}>
        <InputGroupLabel>{label}</InputGroupLabel>
        {columns ? (
          <RadioInputTableView
            name={name}
            columns={columns}
            options={options}
            activeValue={activeValue}
            handleChange={handleChange}
            disabled={disabled}
          />
        ) : (
          <RadioInputStandardView
            name={name}
            options={options}
            activeValue={activeValue}
            handleChange={handleChange}
            disabled={disabled}
          />
        )}
      </InputGroupHolder>
    );
  }
}
