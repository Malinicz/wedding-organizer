import React, { Component } from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { defaults, resolvers } from 'store';

import GlobalStyles from './globalStyles';

import { GuestScene, AuthScene, PageNotFoundScene } from 'scenes';
import { PrivateRoute } from 'components';

const history = createBrowserHistory();

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  clientState: {
    defaults,
    resolvers,
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path="/login" component={AuthScene} />
            <PrivateRoute exact path="/" component={GuestScene} />
            <Route component={PageNotFoundScene} />
          </Switch>
        </BrowserRouter>
        <GlobalStyles />
      </ApolloProvider>
    );
  }
}

export default App;
