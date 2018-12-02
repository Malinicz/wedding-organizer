import gql from 'graphql-tag';

export const SET_IS_LOGGED_MUTATION = gql`
  mutation SetIsLoggedMutation($isLogged: Boolean!) {
    setIsLogged(isLogged: $isLogged) @client
  }
`;

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($login: String!, $password: String!) {
    authenticate(login: $login, password: $password) {
      success
    }
  }
`;
