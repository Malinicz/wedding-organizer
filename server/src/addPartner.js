const { fromEvent } = require('graphcool-lib');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { guestGroupId, partnerName } = event.data;

    const {
      createGuest: { id: partnerId },
    } = await createGuest(api, partnerName);
    guest = await getGuest(api, partnerId);
    await addPartnerToGuestGroup(api, guestGroupId, guest.Guest.id);

    return {
      data: {
        id: '0',
      },
    };
  } catch (e) {
    console.log(e);
    return { error: 'Wystąpił nieoczekiwany błąd' };
  }
};

async function createGuest(api, name) {
  const mutation = `
    mutation CreateGuest($name: String!) {
      createGuest(name: $name, isPresent: true, isVegetarian: false) {
        id
      }
    }
  `;

  const variables = {
    name,
  };

  return await api.request(mutation, variables);
}

async function getGuest(api, id) {
  const query = `
    query GetGuest($id: ID!) {
      Guest(id: $id) {
        id
      }
    }
  `;

  const variables = {
    id,
  };

  return await api.request(query, variables);
}

async function addPartnerToGuestGroup(api, guestGroupId, partnerId) {
  const mutation = `
    mutation AddToGuestGroupOnGuest($guestGroupId: ID!, $partnerId: ID!) {
        addToGuestGroupOnGuest(guestsGuestId: $partnerId, guestGroupGuestGroupId: $guestGroupId) {
        guestsGuest {
            id
        }
        guestGroupGuestGroup {
            id
          }
      }
    }
  `;

  const variables = {
    guestGroupId,
    partnerId,
  };

  return await api.request(mutation, variables);
}
