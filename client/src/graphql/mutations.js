import gql from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation SignUpUser($email: String!, $password: String!) {
    signUpUser(email: $email, password: $password, privacyPolicyConsent: true) {
      authUser
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

export const UPDATE_GUEST_GROUP_MUTATION = gql`
  mutation UpdateGuestGroup($id: ID!, $transport: Boolean) {
    updateGuestGroup(id: $id, transport: $transport) {
      id
    }
  }
`;

export const SAVE_GUEST_GROUP_FORM = gql`
  mutation SaveGuestGroupForm(
    $id: ID!
    $guests: Json!
    $accomodation: Boolean!
    $transport: Boolean!
    $comments: String
    $contactEmail: String
  ) {
    saveGuestGroupForm(
      id: $id
      guests: $guests
      accomodation: $accomodation
      transport: $transport
      comments: $comments
      contactEmail: $contactEmail
    ) {
      id
    }
  }
`;

export const MANUAL_GUEST_GROUP_UPDATE = gql`
  mutation ManualGuestGroupUpdate(
    $id: ID!
    $guests: Json!
    $accomodation: Boolean!
    $transport: Boolean!
    $comments: String
    $contactEmail: String
    $isDraft: Boolean!
  ) {
    manualGuestGroupUpdate(
      id: $id
      guests: $guests
      accomodation: $accomodation
      transport: $transport
      comments: $comments
      contactEmail: $contactEmail
      isDraft: $isDraft
    ) {
      id
    }
  }
`;

export const ADD_PARTNER_MUTATION = gql`
  mutation AddPartner(
    $guestGroupId: ID!
    $guestId: ID!
    $firstName: String!
    $lastName: String!
  ) {
    addPartner(
      guestGroupId: $guestGroupId
      guestId: $guestId
      firstName: $firstName
      lastName: $lastName
    ) {
      partner
    }
  }
`;

export const DELETE_PARTNER_MUTATION = gql`
  mutation DeletePartner($partnerId: ID!) {
    deleteGuest(id: $partnerId) {
      id
    }
  }
`;

export const CREATE_SUBSCRIBER = gql`
  mutation CreateSubscriber($email: String!) {
    createSubscriber(email: $email) {
      id
    }
  }
`;

export const ADD_GUESTS = gql`
  mutation AddGuests(
    $weddingId: ID!
    $name: String!
    $customGreeting: String
    $allowAccomodation: Boolean!
    $guests: Json!
  ) {
    addGuests(
      weddingId: $weddingId
      name: $name
      allowAccomodation: $allowAccomodation
      guests: $guests
      customGreeting: $customGreeting
    ) {
      id
    }
  }
`;
