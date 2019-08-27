import React from 'react';
import { Query } from 'react-apollo';
import { withRouter, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styles';
import { client as apolloClient } from 'App';

import { Icon } from 'components';

import logo from 'assets/logo.png';

import { ORGANISER_WEDDING, SIGN_IN } from 'constants/routes';

import { GET_AUTH_USER } from 'graphql/queries';

const SIDEBAR_WIDTH = 290;

const SideBarHolder = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: ${SIDEBAR_WIDTH}px;
  min-height: 100vh;
`;

const FixedWrapper = styled.div`
  position: fixed;
  z-index: 200;
  height: 100%;
  width: ${SIDEBAR_WIDTH}px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.brightest};
`;

const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const HeaderHeadingHolder = styled.div``;

const HeaderTitle = styled.h1`
  font-size: 1.4em;
  margin-bottom: 7px;
`;

const HeaderSubtitle = styled.div`
  font-size: 0.8em;
  margin-left: 2px;
`;

const Logo = styled.img`
  width: 100px;
  margin-right: 8px;
`;

const Navigation = styled.nav`
  width: 100%;
`;

const NavGroup = styled.div`
  padding-bottom: 30px;
`;

const NavGroupTitle = styled.div`
  color: ${({ theme }) => theme.colors.primaryDarkest};
  font-size: 0.95em;
  padding: ${({ theme }) => theme.baseSpacing}px;
  padding-bottom: 5px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: ${({ theme }) => theme.baseSpacing}px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primaryDarker : 'transparent'};
  pointer-events: ${({ active }) => (active ? 'none' : 'auto')};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavItemIcon = styled.div`
  margin-right: 10px;
`;

const NavItemText = styled.div``;

const LoggedUserInfo = styled.div`
  padding: ${({ theme }) => theme.baseSpacing}px;
`;

const LoggedUserTitle = styled.div`
  color: ${({ theme }) => theme.colors.primaryDarkest};
  font-size: 0.8em;
`;

const LoggedUserName = styled.div``;

const RouteLink = styled(Link)`
  width: 100%;
  color: ${({ theme }) => theme.colors.darker};
  &:active {
    transform: none;
  }
`;

export const SideBar = withRouter(
  ({
    match: {
      params: { id: weddingId },
    },
    location: { pathname },
    history,
  }) => {
    const onLogOut = () => {
      apolloClient.resetStore();
      window.localStorage.removeItem('token');
      history.push(SIGN_IN);
    };

    return (
      <Query query={GET_AUTH_USER}>
        {({ data: { user }, loading }) => {
          const loggedInUser =
            user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.email;

          const weddingName = user.weddings[0].name;

          return (
            <SideBarHolder>
              <FixedWrapper>
                <SideBarHeader>
                  <Logo src={logo} />
                  <HeaderHeadingHolder>
                    <HeaderTitle>
                      Witaj, {user.firstName ? user.firstName : 'Gościu'}!
                    </HeaderTitle>

                    <HeaderSubtitle>
                      {loading ? '...' : weddingName}
                    </HeaderSubtitle>
                  </HeaderHeadingHolder>
                </SideBarHeader>
                <Navigation>
                  <NavGroup>
                    <NavGroupTitle>Wesele</NavGroupTitle>
                    <NavList>
                      <RouteLink
                        to={`${ORGANISER_WEDDING}/${weddingId}/dodaj-gosci`}
                      >
                        <NavItem
                          active={
                            !!matchPath(
                              pathname,
                              `${ORGANISER_WEDDING}/${weddingId}/dodaj-gosci`
                            )
                          }
                        >
                          <NavItemIcon>
                            <Icon name="addUser" size={30} />
                          </NavItemIcon>
                          <NavItemText>Dodaj Gości</NavItemText>
                        </NavItem>
                      </RouteLink>
                      <RouteLink
                        to={`${ORGANISER_WEDDING}/${weddingId}/lista-gosci`}
                      >
                        <NavItem
                          active={
                            !!matchPath(
                              pathname,
                              `${ORGANISER_WEDDING}/${weddingId}/lista-gosci`
                            )
                          }
                        >
                          <NavItemIcon>
                            <Icon name="list" size={30} />
                          </NavItemIcon>
                          <NavItemText>Lista Gości</NavItemText>
                        </NavItem>
                      </RouteLink>
                      <NavItem>
                        <NavItemIcon>
                          <Icon name="stats" size={30} />
                        </NavItemIcon>
                        <NavItemText>Statystyki</NavItemText>
                      </NavItem>
                      <NavItem>
                        <NavItemIcon>
                          <Icon name="configuration" size={30} />
                        </NavItemIcon>
                        <NavItemText>Konfiguracja</NavItemText>
                      </NavItem>
                    </NavList>
                  </NavGroup>
                  <NavGroup>
                    <NavGroupTitle>Konto</NavGroupTitle>
                    <NavList>
                      <NavItem>
                        <NavItemIcon>
                          <Icon name="accountSettings" size={30} />
                        </NavItemIcon>
                        <NavItemText>Ustawienia</NavItemText>
                      </NavItem>
                      <NavItem onClick={onLogOut}>
                        <NavItemIcon>
                          <Icon name="logOut" size={30} />
                        </NavItemIcon>
                        <NavItemText>Wyloguj</NavItemText>
                      </NavItem>
                    </NavList>
                  </NavGroup>
                </Navigation>
                <LoggedUserInfo>
                  <LoggedUserTitle>Zalogowany jako</LoggedUserTitle>
                  <LoggedUserName>
                    {loading ? '...' : loggedInUser}
                  </LoggedUserName>
                </LoggedUserInfo>
              </FixedWrapper>
            </SideBarHolder>
          );
        }}
      </Query>
    );
  }
);
