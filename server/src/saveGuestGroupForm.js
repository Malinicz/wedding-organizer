const { fromEvent } = require('graphcool-lib');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const {
      id,
      guests,
      transport,
      accomodation,
      comments,
      contactEmail,
    } = event.data;

    for (let i = 0, len = guests.length; i < len; i++) {
      await updateGuest(api, guests[i]);
    }

    await updateGuestGroup(api, {
      id,
      accomodation,
      transport,
      comments,
      contactEmail,
    });

    return {
      data: {
        id,
      },
    };
  } catch (e) {
    console.log(e);
    return { error: 'Wystąpił nieoczekiwany błąd' };
  }
};

async function updateGuest(api, guest) {
  const mutation = `
    mutation UpdateGuest($id: ID!, $isPresent: Boolean!, $isVegetarian: Boolean!, $drinksIds: [ID!]) {
      updateGuest(id: $id, isPresent: $isPresent, isVegetarian: $isVegetarian, drinksIds: $drinksIds) {
        id
      }
    }
  `;

  const variables = {
    id: guest.id,
    isPresent: guest.isPresent,
    isVegetarian: guest.isVegetarian,
    drinksIds: guest.drinks.map(drink => drink.id),
  };

  return await api.request(mutation, variables);
}

async function updateGuestGroup(
  api,
  { id, accomodation, transport, comments, contactEmail }
) {
  const mutation = `
    mutation UpdateGuestGroup($id: ID!, $accomodation: Boolean!, $transport: Boolean!, $comments: String, $submissionDate: DateTime, $contactEmail: String) {
      updateGuestGroup(id: $id, accomodation: $accomodation, transport: $transport, comments: $comments, submissionDate: $submissionDate, contactEmail: $contactEmail) {
        id
      }
    }
  `;

  const variables = {
    id,
    accomodation,
    transport,
    comments,
    contactEmail,
    submissionDate: new Date(),
  };

  return await api.request(mutation, variables);
}
