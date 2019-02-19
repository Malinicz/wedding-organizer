import React from 'react';
import styled from 'styles';

import { Button } from 'components/base';
import { Icon } from 'components';

const ActionButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  opacity: ${({ error }) => (error ? '1' : '0')};
  height: ${({ error }) => (error ? '16px' : '1px')};
  transition: height 0.3s ease, opacity 0.3s ease;
`;

const ButtonHolder = styled(Button)`
  position: relative;
  overflow: hidden;
  margin-top: 20px;
`;

const ButtonInside = styled.div`
  position: absolute;
  top: 0;
  transform: ${({ loading }) =>
    loading ? `translateY(-50px)` : `translateY(0)`};
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
