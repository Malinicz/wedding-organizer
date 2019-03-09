import React from 'react';
import styled from 'styles';

import { Footer } from 'components';

export const Header = styled.header`
  display: flex;
`;

export const Main = styled.main`
  width: 100%;
  max-width: 1300px;
`;

const LayoutHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
`;

export const Layout = ({ children }) => {
  return (
    <LayoutHolder>
      {children}
      <Footer />
    </LayoutHolder>
  );
};
