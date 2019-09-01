import { defaults, resolvers } from '.';
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  clientState: {
    defaults,
    resolvers,
  },
  request: operation => {
    const token = window.localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});