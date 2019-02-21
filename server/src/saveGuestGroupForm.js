const { fromEvent } = require('graphcool-lib');

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

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

    const { GuestGroup: guestGroup } = await getGuestGroup(api, { id });

    const data = {
      from: 'pomoc@witajgosciu.pl',
      to: `${guestGroup.wedding.user.email}`,
      subject: `${guestGroup.name} wypełnili wniosek`,
      text: 'Wypełnili!',
    };

    mailgun.messages().send(data, function(error, body) {
      console.log(body);
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

async function getGuestGroup(api, { id }) {
  const query = `
    query GetGuestGroup($id: ID!) {
      GuestGroup(id: $id) {
        id
        name
        wedding {
          user {
            email
          }
        }
      }
    }
  `;

  const variables = {
    id,
  };

  return await api.request(query, variables);
}
