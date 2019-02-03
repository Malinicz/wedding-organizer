import gql from 'graphql-tag';

export default gql`
  type AuthUser {
    id: String
    role: String
    email: String
    token: String
  }

  type Mutation {
    setAuthUser(authUser: AuthUser!): AuthUser
  }

  type Query {
    authUser: AuthUser
  }
`;
