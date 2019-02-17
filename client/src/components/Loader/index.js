import React from 'react';
import styled from 'styles';

import { Layout, Icon } from 'components';
import { Section } from 'components/base';

const LoaderHolder = styled(Section)`
  margin-top: 60px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryDarkest};
`;

const LoaderText = styled.p`
  margin: -5px 0 0 0;
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  font-size: 0.8em;
`;

export const Loader = () => {
  return (
    <Layout>
      <LoaderHolder>
        <Icon name="loader" size={50} />
        <LoaderText>ładowanie</LoaderText>
      </LoaderHolder>
    </Layout>
  );
};
