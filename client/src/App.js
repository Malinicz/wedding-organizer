import React, { Component } from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  GlobalStyles,
  styledTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styles';

import { defaults, resolvers } from './graphql';

import { PrivateRoute, ScrollToTop } from 'components';
import { SignIn, PageNotFound, Guest, Home, About, Organiser } from 'scenes';
import { FormSubmissionSuccess } from 'scenes/Guest/scenes';
import { SubscriberSubmissionSuccess } from 'scenes/About/scenes';

import { SET_AUTH_USER_MUTATION } from 'graphql/mutations';

import {
  SIGN_IN,
  GUEST,
  ORGANISER,
  HOME,
  ABOUT,
  GUEST_FORM_SUBMISSION_SUCCESS,
  ABOUT_SUBSCRIBER_SUBMISSION_SUCCESS,
} from 'constants/routes';

const history = createBrowserHistory();

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  clientState: {
    defaults,
    resolvers,
  },
  request: async operation => {
    const token = await window.localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

class App extends Component {
  componentDidMount() {
    this.setAuthUser();
  }

  setAuthUser = async () => {
    const authUserFromStorage = window.localStorage.getItem('user');
    const tokenFromStorage = window.localStorage.getItem('token');

    if (
      authUserFromStorage !== 'undefined' &&
      tokenFromStorage !== 'undefined'
    ) {
      const authUser = JSON.parse(authUserFromStorage);

      await client.mutate({
        mutation: SET_AUTH_USER_MUTATION,
        variables: { authUser, token: tokenFromStorage },
      });
    }
  };

  render() {
    return (
      <StyledThemeProvider theme={styledTheme}>
        <ApolloProvider client={client}>
          <BrowserRouter history={history}>
            <ScrollToTop>
              <Switch>
                <Route exact path={HOME} component={Home} />
                <Route exact path={ABOUT} component={About} />
                <Route
                  exact
                  path={ABOUT_SUBSCRIBER_SUBMISSION_SUCCESS}
                  component={SubscriberSubmissionSuccess}
                />
                <Route exact path={SIGN_IN} component={SignIn} />
                <PrivateRoute
                  exact
                  path={GUEST_FORM_SUBMISSION_SUCCESS}
                  component={FormSubmissionSuccess}
                />
                <PrivateRoute exact path={`${GUEST}/:id`} component={Guest} />
                <PrivateRoute path={ORGANISER} component={Organiser} />
                <Route component={PageNotFound} />
              </Switch>
            </ScrollToTop>
          </BrowserRouter>
          <GlobalStyles />
        </ApolloProvider>
      </StyledThemeProvider>
    );
  }
}

export default App;
