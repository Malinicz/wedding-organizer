import gql from 'graphql-tag';

export const SET_AUTH_USER_MUTATION = gql`
  mutation SetAuthUserMutation($authUser: Json!) {
    setAuthUser(authUser: $authUser) @client
  }
`;

export const GET_AUTH_USER_MUTATION = gql`
  mutation GetAuthUser {
    getAuthUser @client
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUpUser($email: String!, $password: String!) {
    signUpUser(email: $email, password: $password, privacyPolicyConsent: true) {
      id
      token
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      authUser
    }
  }
`;
