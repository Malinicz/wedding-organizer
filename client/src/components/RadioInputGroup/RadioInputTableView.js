import React from 'react';
import styled from 'styles';

import { RadioInput } from 'components';

import { divideArrayIntoChunks } from 'utils/helpers';

const RadioInputsTable = styled.div`
  display: table;
`;

const RadioInputsRow = styled.div`
  display: table-row;
`;

export const RadioInputTableView = ({
  options,
  activeValue,
  handleChange,
  columns,
  name,
}) => {
  const groupedOptions = divideArrayIntoChunks(options, columns);

  return (
    <RadioInputsTable>
      {groupedOptions.map((optionsGroup, index) => {
        return (
          <RadioInputsRow key={index}>
            {optionsGroup.map(option => {
              const isActive = activeValue === option.value;

              return (
                <RadioInput
                  name={name}
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  isActive={isActive}
                  onChange={handleChange}
                  style={{ display: 'table-cell' }}
                />
              );
            })}
          </RadioInputsRow>
        );
      })}
    </RadioInputsTable>
  );
};
