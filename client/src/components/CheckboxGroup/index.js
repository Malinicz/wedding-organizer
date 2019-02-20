import React, { Component } from 'react';

import { InputGroupLabel, InputGroupHolder } from 'components/base';
import { CheckboxStandardView } from './CheckboxStandardView';
import { CheckboxTableView } from './CheckboxTableView';

export class CheckboxGroup extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.activeValues !== this.props.activeValues ||
      nextProps.disabled !== this.props.disabled
    );
  }

  render() {
    const {
      label,
      options,
      handleChange,
      activeValues,
      columns,
      disabled,
    } = this.props;

    return (
      <InputGroupHolder disabled={disabled}>
        <InputGroupLabel>{label}</InputGroupLabel>
        {columns ? (
          <CheckboxTableView
            columns={columns}
            options={options}
            activeValues={activeValues}
            handleChange={handleChange}
            disabled={disabled}
          />
        ) : (
          <CheckboxStandardView
            options={options}
            activeValues={activeValues}
            handleChange={handleChange}
            disabled={disabled}
          />
        )}
      </InputGroupHolder>
    );
  }
}
