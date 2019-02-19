const { fromEvent } = require('graphcool-lib');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { guestGroupId, guestId, firstName, lastName } = event.data;

    const { Guest: guest } = await getGuest(api, guestId);

    if (!guest.allowPartner) {
      return { error: 'Dodanie osoby towarzyszącej nie jest możliwe' };
    }

    if (guest.allowPartner && guest.partner) {
      return { error: 'Osoba towarzysząca została już dodana' };
    }

    const { createGuest: partner } = await createPartner(
      api,
      firstName,
      lastName,
      guestId,
      guestGroupId
    );

    return {
      data: {
        partner,
      },
    };
  } catch (e) {
    console.log(e);
    return { error: 'Wystąpił nieoczekiwany błąd' };
  }
};

async function createPartner(
  api,
  firstName,
  lastName,
  partnerId,
  guestGroupId
) {
  const mutation = `
    mutation CreateGuest($firstName: String!, $lastName: String!, $partnerId: ID!, $guestGroupId: ID!) {
      createGuest(firstName: $firstName, lastName: $lastName, isPresent: true, isVegetarian: false, partnerId: $partnerId, guestGroupId: $guestGroupId) {
        id
        firstName
        lastName
        allowPartner
        isPresent
        isVegetarian
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
  `;

  const variables = {
    firstName,
    lastName,
    partnerId,
    guestGroupId,
  };

  return await api.request(mutation, variables);
}

async function getGuest(api, id) {
  const query = `
    query GetGuest($id: ID!) {
      Guest(id: $id) {
        id
        firstName
        lastName
        allowPartner
        isPresent
        isVegetarian
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
  `;

  const variables = {
    id,
  };

  return await api.request(query, variables);
}
