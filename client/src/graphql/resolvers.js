import gql from 'graphql-tag';

export default {
  Mutation: {
    setAuthUser: async (_, { authUser, token }, { cache }) => {
      window.localStorage.setItem('user', JSON.stringify(authUser));
      window.localStorage.setItem('token', token);

      const query = gql`
        {
          authUser @client
        }
      `;

      await cache.writeQuery({
        query,
        data: { authUser },
      });

      return authUser;
    },
  },
};
