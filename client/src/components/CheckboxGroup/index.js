import React, { Component } from 'react';
import { styledTheme } from 'styles';

import { InputGroupLabel, InputGroupHolder } from 'components/base';
import { CheckboxStandardView } from './CheckboxStandardView';
import { CheckboxTableView } from './CheckboxTableView';

export class CheckboxGroup extends Component {
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
      <InputGroupHolder>
        <InputGroupLabel
          style={{ color: disabled ? styledTheme.colors.brighter : 'inherit' }}
        >
          {label}
        </InputGroupLabel>
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
