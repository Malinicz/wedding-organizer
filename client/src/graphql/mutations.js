import gql from 'graphql-tag';

export const SET_AUTH_USER_MUTATION = gql`
  mutation SetAuthUserMutation($authUser: Json!, $token: String!) {
    setAuthUser(authUser: $authUser, token: $token) @client
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
      token
    }
  }
`;

export const GUEST_SIGN_IN_MUTATION = gql`
  mutation SignInGuest($weddingId: String!, $code: String!) {
    signInGuest(weddingId: $weddingId, code: $code) {
      authUser
      token
    }
  }
`;

export const UPDATE_GUEST_GROUP = gql`
  mutation UpdateGuestGroup($id: ID!, $transport: Boolean) {
    updateGuestGroup(id: $id, transport: $transport) {
      id
    }
  }
`;
