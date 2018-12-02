import gql from 'graphql-tag';

export default gql`
  type IsLogged {
    isLogged: Boolean
  }

  type Mutation {
    setIsLogged(isLogged: Boolean!): IsLogged
  }
`;
