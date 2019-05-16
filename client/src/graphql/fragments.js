import gql from 'graphql-tag';

export const GUEST_GROUP = gql`
  fragment GuestGroup on GuestGroup {
    id
    name
    customGreeting
    accomodation
    allowAccomodation
    comments
    transport
    contactEmail
    submissionDate
    guests {
      id
      firstName
      lastName
      isPresent
      isVegetarian
      allowPartner
      guestGroup {
        submissionDate
        allowAccomodation
        accomodation
      }
      partner {
        id
        firstName
        lastName
      }
      drinks {
        id
        name
        price
      }
    }
  }
`;
