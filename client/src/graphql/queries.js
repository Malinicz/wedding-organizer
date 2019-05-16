import gql from 'graphql-tag';
import { GUEST_GROUP } from './fragments';

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

export const GET_WEDDING_INITIAL_DATA = gql`
  query GetWeddingInitialData($id: ID!) {
    Wedding(id: $id) {
      id
      internalId
      name
      weddingChurch {
        id
        name
        street
        city
        startTime
        locationUrl
      }
      weddingParty {
        id
        name
        street
        city
        startTime
        locationUrl
      }
      description
      guestGroups {
        ...GuestGroup
      }
    }
  }
  ${GUEST_GROUP}
`;
