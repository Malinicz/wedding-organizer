import gql from 'graphql-tag';

export const GET_AUTH_USER = gql`
  {
    authUser @client {
      id
      email
      token
      role
    }
  }
`;
