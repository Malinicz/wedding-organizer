import React from 'react';
import styled from 'styles';

import { Footer } from 'components';

const Main = styled.main`
  width: 100%;
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
      <Main>{children}</Main>
      <Footer />
    </LayoutHolder>
  );
};
