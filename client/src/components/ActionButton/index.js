import React from 'react';
import styled from 'styles';

import { Button } from 'components/base';
import { Icon } from 'components';

const ActionButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.inputMaxWidth}px;
`;

const ErrorMessage = styled.div.attrs(props => ({
  style: {
    opacity: props.error ? '1' : '0',
    maxHeight: props.error ? '50px' : '1px',
  },
}))`
  text-align: center;
  font-size: 0.9em;
  transition: max-height 0.3s ease, opacity 0.3s ease;
`;

const ButtonHolder = styled(Button)`
  position: relative;
  overflow: hidden;
  margin-top: 20px;
`;

const ButtonInside = styled.div.attrs(props => ({
  style: {
    transform: props.loading ? 'translateY(-50px)' : 'translateY(0)',
  },
}))`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: transform 0.3s ease;
`;

const ButtonLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const ButtonLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

export const ActionButton = ({
  label,
  style,
  type,
  loading,
  error,
  ...props
}) => {
  return (
    <ActionButtonHolder>
      <ErrorMessage error={error}>{error}</ErrorMessage>
      <ButtonHolder style={style} type={type || 'button'} {...props}>
        <ButtonInside loading={loading}>
          <ButtonLabel>{label}</ButtonLabel>
          <ButtonLoader>
            <Icon name="loader" size={50} marginTop={7} />
          </ButtonLoader>
        </ButtonInside>
      </ButtonHolder>
    </ActionButtonHolder>
  );
};
