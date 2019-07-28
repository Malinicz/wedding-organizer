const { fromEvent } = require('graphcool-lib');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { weddingId, code } = event.data;

    const guestGroup = await getGuestGroup(api, weddingId, code).then(
      response => response.allGuestGroups
    );

    if (guestGroup.length !== 1) {
      return {
        error:
          'Wygląda na to, że taki login lub kod nie istnieje 😔. Sprawdź, czy poprawnie wprowadziłeś dane i spróbuj ponownie.',
      };
    }

    const guestGroupId = guestGroup[0].id;

    const token = await graphcool.generateNodeToken(guestGroupId, 'GuestGroup');

    return {
      data: {
        authUser: {
          id: guestGroupId,
        },
        token,
      },
    };
  } catch (e) {
    console.log(e);
    return { error: 'Wystąpił nieoczekiwany błąd' };
  }
};

async function getGuestGroup(api, weddingId, code) {
  const query = `
    query GetGuestGroup($weddingId: String!, $code: String!) {
      allGuestGroups(filter: {
          wedding: {
            internalId: $weddingId
          },
          code: $code
      }) {
        id
      }
    }
  `;

  const variables = {
    weddingId,
    code,
  };

  return api.request(query, variables);
}
