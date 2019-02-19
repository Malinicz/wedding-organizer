const { fromEvent } = require('graphcool-lib');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { id, guests, transport, accomodation, comments } = event.data;

    for (let i = 0, len = guests.length; i < len; i++) {
      await updateGuest(api, guests[i]);
    }

    await updateGuestGroup(api, id, accomodation, transport, comments);

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
  guestGroupId,
  accomodation,
  transport,
  comments
) {
  const mutation = `
    mutation UpdateGuestGroup($guestGroupId: ID!, $accomodation: Boolean!, $transport: Boolean!, $comments: String) {
      updateGuestGroup(id: $guestGroupId, accomodation: $accomodation, transport: $transport, comments: $comments) {
        id
      }
    }
  `;

  const variables = {
    guestGroupId,
    accomodation,
    transport,
    comments,
  };

  return await api.request(mutation, variables);
}
