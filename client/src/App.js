import React, { Component } from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { defaults, resolvers } from './graphql';

import GlobalStyles from './globalStyles';

import { SignIn, SignUp, PageNotFound, Guest } from 'scenes';
import { PrivateRoute } from 'components';

import { SET_AUTH_USER_MUTATION } from 'graphql/mutations';

import { SIGN_IN, SIGN_UP, GUEST, HOME } from 'constants/routes';

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

    if (authUserFromStorage && tokenFromStorage) {
      const authUser = JSON.parse(authUserFromStorage);

      await client.mutate({
        mutation: SET_AUTH_USER_MUTATION,
        variables: { authUser, token: tokenFromStorage },
      });
    }
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path={HOME} component={SignIn} />
            <Route exact path={SIGN_IN} component={SignIn} />
            <Route exact path={SIGN_UP} component={SignUp} />
            <PrivateRoute exact path={GUEST} component={Guest} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
        <GlobalStyles />
      </ApolloProvider>
    );
  }
}

export default App;
