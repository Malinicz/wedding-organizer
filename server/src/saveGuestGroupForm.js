const { fromEvent } = require('graphcool-lib');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { id, guests } = event.data;

    for (let i = 0, len = guests.length; i < len; i++) {
      await updateGuest(api, guests[i]);
    }

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
