const { fromEvent } = require('graphcool-lib');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const {
      data,
      data: { guests, weddingId },
      context: { auth },
    } = event;

    if (!auth) return { error: 'Brak dostępu' };

    for (let i = 0, length = guests.length; i < length; i++) {
      if (!guests[i].firstName || !guests[i].lastName)
        return { error: 'Wymagane imię i nazwisko' };
    }

    const {
      Wedding: { guestGroups },
    } = await getWeddingCodes(api, weddingId);

    const uniqueCodes = guestGroups.map(guestGroup => guestGroup.code);
    const code = getUniqueCode(uniqueCodes);

    const guestGroup = await createGuestGroup(api, { ...data, code });

    const {
      createGuestGroup: { id: guestGroupId },
    } = guestGroup;

    for (let i = 0, len = guests.length; i < len; i++) {
      await createGuest(api, guestGroupId, guests[i]);
    }

    return {
      data: {
        id: guestGroupId,
      },
    };
  } catch (e) {
    console.log(e);
    return { error: 'Wystąpił nieoczekiwany błąd' };
  }
};

async function createGuestGroup(
  api,
  { weddingId, allowAccomodation, customGreeting, code }
) {
  const mutation = `
    mutation AddGuests(
        $weddingId: ID!
        $allowAccomodation: Boolean!
        $customGreeting: String
        $code: String!
    ) {
        createGuestGroup(
        accomodation: false
        customGreeting: $customGreeting
        allowAccomodation: $allowAccomodation
        transport: true
        code: $code
        weddingId: $weddingId
        ) {
        id
        }
    }
  `;

  const variables = {
    weddingId,
    allowAccomodation,
    customGreeting,
    code,
  };

  return await api.request(mutation, variables);
}

async function createGuest(api, guestGroupId, guest) {
  const mutation = `
      mutation CreateGuest($guestGroupId: ID!, $firstName: String!, $lastName: String!, $allowPartner: Boolean!) {
        createGuest(guestGroupId: $guestGroupId, firstName: $firstName, lastName: $lastName, allowPartner: $allowPartner, isPresent: true, isVegetarian: false, isDrinkingAlcohol: true) {
          id
        }
      }
    `;

  const variables = {
    guestGroupId,
    firstName: guest.firstName,
    lastName: guest.lastName,
    allowPartner: guest.allowPartner,
  };

  return await api.request(mutation, variables);
}

async function getWeddingCodes(api, weddingId) {
  const query = `
        query GetWeddingCodes($weddingId: ID!) {
            Wedding(id: $weddingId) {
                id
                guestGroups {
                  code
                }
            }
        }
      `;

  const variables = {
    weddingId,
  };

  return await api.request(query, variables);
}

function getUniqueCode(codes) {
  const newCode = generateCode();

  return codes.includes(newCode) ? getUniqueCode(codes) : newCode;
}

function generateCode() {
  const possibleChars = 'ABCDEFGHJKLMNPRSTUWXYZ3456789';
  let code = '';

  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * (possibleChars.length - 1));
    code = code + possibleChars[index];
  }

  return code;
}
