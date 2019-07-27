const { fromEvent } = require('graphcool-lib');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const {
      data,
      context: { auth },
    } = event;

    if (!auth) return { error: 'Brak dostępu' };

    const {
      id,
      guests,
      transport,
      accomodation,
      comments,
      contactEmail,
      isDraft,
    } = data;

    for (let i = 0, len = guests.length; i < len; i++) {
      await updateGuest(api, guests[i]);
    }

    await updateGuestGroup(api, {
      id,
      accomodation,
      transport,
      comments,
      contactEmail,
      isDraft,
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
    mutation UpdateGuest($id: ID!, $isPresent: Boolean!, $isVegetarian: Boolean!, $isDrinkingAlcohol: Boolean!) {
      updateGuest(id: $id, isPresent: $isPresent, isVegetarian: $isVegetarian, isDrinkingAlcohol: $isDrinkingAlcohol) {
        id
      }
    }
  `;

  const variables = {
    id: guest.id,
    isPresent: guest.isPresent,
    isVegetarian: guest.isVegetarian,
    isDrinkingAlcohol: guest.isDrinkingAlcohol,
  };

  return await api.request(mutation, variables);
}

async function updateGuestGroup(
  api,
  { id, accomodation, transport, comments, contactEmail, isDraft }
) {
  const mutation = `
    mutation UpdateGuestGroup($id: ID!, $accomodation: Boolean!, $transport: Boolean!, $comments: String, $manualSubmissionDate: DateTime, $contactEmail: String, $isDraft: Boolean!) {
      updateGuestGroup(id: $id, accomodation: $accomodation, transport: $transport, comments: $comments, manualSubmissionDate: $manualSubmissionDate, contactEmail: $contactEmail, isDraft: $isDraft) {
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
    manualSubmissionDate: new Date(),
    isDraft,
  };

  return await api.request(mutation, variables);
}
