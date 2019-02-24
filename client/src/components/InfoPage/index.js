import React from 'react';
import styled from 'styles';

import { Footer } from 'components';
import { Paragraph } from 'components/base';

const InfoPageHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  padding: ${({ theme }) => theme.baseSpacing}px;
`;

export const InfoPageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
`;

export const InfoPageSubtitle = styled(Paragraph)`
  text-align: center;
`;

export const InfoPage = ({ children }) => {
  return (
    <InfoPageHolder>
      <Content>{children}</Content>
      <Footer />
    </InfoPageHolder>
  );
};
