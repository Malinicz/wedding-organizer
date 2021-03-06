import gql from 'graphql-tag';

export const GUEST_GROUP = gql`
  fragment GuestGroup on GuestGroup {
    id
    code
    customGreeting
    accomodation
    allowAccomodation
    comments
    transport
    contactEmail
    submissionDate
    manualSubmissionDate
    isDraft
    guests {
      id
      firstName
      lastName
      isPresent
      isVegetarian
      isDrinkingAlcohol
      allowPartner
      guestGroup {
        submissionDate
        manualSubmissionDate
        allowAccomodation
        accomodation
        isDraft
        transport
      }
      partner {
        id
        firstName
        lastName
      }
    }
  }
`;
