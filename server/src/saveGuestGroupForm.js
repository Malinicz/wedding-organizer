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

    const notPresentGuests = guestGroup.guests
      .filter(guest => !guest.isPresent)
      .map(guest => guest.firstName);

    let isPresentMessage = 'wszyscy przyjdą!';

    if (notPresentGuests.length) {
      isPresentMessage = `niestety, ${notPresentGuests.join(' i ')} nie ${
        notPresentGuests.length === 1 ? 'przyjdzie' : 'przyjdą'
      } :(`;
    }

    const mailHtml = `
      <html>
        <body style="padding: 0; margin: 0; color: #2f2f2f; font-family: Helvetica, Arial, sans-serif; font-size: 16px;">
          <img src="http://serwer30424.lh.pl/dot.png" />
          <div style="max-width: 600px;">
            <div style="position: relative; padding: 15px; border-bottom: 1px solid #dbdbdb; background-color: #ffffff;">
              <h1 style="font-weight: bold; font-size: 20px;">
                Cześć!
              </h1>
            </div>
            <div style="padding: 15px; background-color: #fdf8f7;">
              <p style="margin-bottom: 30px; font-size: 18px;">
                Grupa ${
                  guestGroup.name
                } właśnie wysłała nowe powiadomienie - ${isPresentMessage}
              </p>
              <h2 style="font-size: 16px; margin: 0 0 3px 0;">Transport</h2>
              <p style="margin: 0 0 15px 0;">${
                guestGroup.transport ? 'tak' : 'nie'
              }</p>
              <h2 style="font-size: 16px; margin: 0 0 3px 0;">Nocleg</h2>
              <p style="margin: 0 0 15px 0;">${
                guestGroup.accomodation ? 'tak' : 'nie'
              }</p>
              <h2 style="font-size: 16px; margin: 0 0 3px 0;">Komentarze</h2>
              <p style="margin: 0 0 15px 0;">${guestGroup.comments}</p>
              <p style="margin-top: 30px">
              <a href="https://witajgosciu.pl/sign-in" style="color: #e5998d"><strong>Zaloguj się</strong></a> aby zobaczyć więcej szczegółów!
              </p>
              <p></p>
            </div>

            <div style="padding: 15px; border-top: 1px solid #dbdbdb; font-size: 14px">
              <p>Powiadomienie zostało wysłane, ponieważ opcja “włącz powiadomienia” została zaznaczona w profilu Twojego wesela. Aby zrezygnować z otrzymywania tych powiadomień, <a href="https://witajgosciu.pl/sign-in" style="color: #e5998d">zaloguj się</a> do aplikacji i odznacz tę opcję w zakładce “ustawienia”.</p>
              <p><strong>Wszelkie prawa zastrzeżone © witajgosciu.pl</strong></p>
            </div>
          </div>
        </body>
      </html>`;

    const data = {
      from: 'powiadomienia@witajgosciu.pl',
      to: `${guestGroup.wedding.user.email}, kobylarz.malgorzata@gmail.com`,
      subject: `Nowe powiadomienie od ${guestGroup.name}`,
      html: mailHtml,
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
        transport
        accomodation
        comments
        guests {
          id
          firstName
          lastName
          isPresent
        }
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
