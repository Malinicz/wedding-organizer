const { fromEvent } = require('graphcool-lib');
const bcrypt = require('bcryptjs');

module.exports = async event => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { email, password } = event.data;

    const user = await getUserByEmail(api, email).then(
      response => response.User
    );

    if (!user) {
      return { error: 'Brak użytkownika o podanym loginie' };
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      return { error: 'Nieprawidłowe hasło' };
    }

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

async function getUserByEmail(api, email) {
  const query = `
    query getUserByEmail($email: String!) {
      User(email: $email) {
        id
        email
        password
        role
        weddings {
          id
        }
      }
    }
  `;

  const variables = {
    email,
  };

  return api.request(query, variables);
}
