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

export const GET_WEDDING_NAMES = gql`
  query GetWeddingNames {
    allWeddings {
      id
      name
      internalId
    }
  }
`;

export const GET_GUEST_INITIAL_DATA = gql`
  query GetGuestInitialData($id: ID!) {
    GuestGroup(id: $id) {
      id
      customGreeting
      accomodation
      allowAccomodation
      comments
      transport
      contactEmail
      submissionDate
      wedding {
        id
        name
      }
      guests {
        id
        firstName
        lastName
        isPresent
        isVegetarian
        allowPartner
        partner {
          id
        }
        drinks {
          id
          name
          price
        }
      }
    }
    allDrinks {
      id
      name
      price
    }
  }
`;
