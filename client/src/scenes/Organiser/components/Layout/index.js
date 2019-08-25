import React from 'react';
import styled from 'styles';

import { GlobalToasts } from 'components';
import { SideBar } from './SideBar';

export const Main = styled.main`
  width: 100%;
`;

const LayoutHolder = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
`;

export const Layout = ({ children }) => {
  return (
    <LayoutHolder>
      <SideBar />
      <Main>{children}</Main>
      <GlobalToasts />
    </LayoutHolder>
  );
};
