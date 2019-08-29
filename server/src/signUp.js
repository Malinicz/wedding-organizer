const { fromEvent } = require('graphcool-lib');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const SALT_ROUNDS = 10;

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { email, password, privacyPolicyConsent } = event.data;

    if (!privacyPolicyConsent) {
      return { error: 'Wymagana zgoda na przetwarzanie danych osobowych' };
    }

    if (!validator.isEmail(email)) {
      return { error: 'Nieprawidłowy email' };
    }

    if (!password.trim()) {
      return { error: 'Hasło jest wymagane' };
    }

    // check if user exists already
    const userExists = await getUser(api, email).then(
      response => response.User !== null
    );

    if (userExists) {
      return { error: 'Użytkownik o podanym loginie już istnieje' };
    }

    // create password hash
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await createGraphcoolUser(api, email, hashedPassword);

    // generate node token for new User node
    const token = await graphcool.generateNodeToken(user.id, 'User');

    return {
      data: {
        authUser: {
          id: user.id,
          email: user.email,
          role: user.role,
          weddings: user.weddings,
        },
        token,
      },
    };
  } catch (e) {
    console.log(e);
    return { error: 'Wystąpił nieoczekiwany błąd' };
  }
};

async function getUser(api, email) {
  const query = `
    query getUser($email: String!) {
      User(email: $email) {
        id
      }
    }
  `;

  const variables = {
    email,
  };

  return api.request(query, variables);
}

async function createGraphcoolUser(api, email, password) {
  const mutation = `
    mutation createGraphcoolUser($email: String!, $password: String!, $privacyPolicyConsent: DateTime!) {
      createUser(
        email: $email,
        password: $password
        role: Organiser
        privacyPolicyConsent: $privacyPolicyConsent
        userProfile: {}
        weddings: [
          {
            internalId: $email, 
            slug: $email, 
            name: "Testowe wesele"
            weddingChurch: {
              city: "Testowo", 
              name:"Kościół pod wezwaniem Najświętszego Testu", 
              street: "Testowa 1", 
              startTime: "2019"
            }
            weddingParty: {
              startTime: "2019", 
              city: "Testowo", 
              name: "Karczma Testówka", 
              street: "Testowa 6"
              }
            }
          ]
      ) {
        id
        email
        role
        userProfile {
          id
        }
        weddings {
          id
        }	
      }
    }
  `;

  const variables = {
    email,
    password,
    privacyPolicyConsent: new Date().toISOString(),
  };

  return api.request(mutation, variables).then(response => response.createUser);
}
