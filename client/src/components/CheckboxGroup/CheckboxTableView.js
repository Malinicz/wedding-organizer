import React from 'react';
import styled from 'styles';

import { Checkbox } from 'components';

import { divideArrayIntoChunks } from 'utils/helpers';

const CheckboxesTable = styled.div`
  display: table;
`;

const CheckboxesRow = styled.div`
  display: table-row;
`;

export const CheckboxTableView = ({
  options,
  activeValues,
  handleChange,
  columns,
  disabled,
}) => {
  const groupedOptions = divideArrayIntoChunks(options, columns);

  return (
    <CheckboxesTable>
      {groupedOptions.map((optionsGroup, index) => {
        return (
          <CheckboxesRow key={index}>
            {optionsGroup.map(option => {
              const isChecked = activeValues.includes(option.value);
              return (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  checked={isChecked}
                  onChange={handleChange}
                  disabled={disabled}
                  style={{ display: 'table-cell' }}
                />
              );
            })}
          </CheckboxesRow>
        );
      })}
    </CheckboxesTable>
  );
};
