import gql from 'graphql-tag';
import { GUEST_GROUP } from './fragments';

export const GET_AUTH_USER = gql`
  {
    user {
      id
      email
      role
      firstName
      lastName
      weddings {
        id
        name
      }
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
      manualSubmissionDate
      isDraft
      wedding {
        id
        name
        weddingChurch {
          id
          name
          street
          city
          locationUrl
          startTime
        }
        weddingParty {
          id
          name
          street
          city
          locationUrl
          startTime
        }
      }
      guests {
        id
        firstName
        lastName
        isPresent
        isVegetarian
        isDrinkingAlcohol
        allowPartner
        partner {
          id
        }
      }
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

export const GET_SIDEBAR_DATA = gql`
  query GetSidebarData($id: ID!) {
    Wedding(id: $id) {
      id
      name
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
