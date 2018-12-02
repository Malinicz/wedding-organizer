import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';

import GlobalStyles from './globalStyles';

import { LoginForm } from 'components';

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  setIsLogged = isLogged => {
    this.setState({ isLogged });
  };

  render() {
    const { isLogged } = this.state;

    return (
      <ApolloProvider client={client}>
        <Main>
          <LoginForm setIsLogged={this.setIsLogged} isLogged={isLogged} />
          <GlobalStyles />
        </Main>
      </ApolloProvider>
    );
  }
}

export default App;
