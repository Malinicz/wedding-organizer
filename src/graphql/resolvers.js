import gql from 'graphql-tag';

export default {
  Mutation: {
    setAuthUser: async (_, { authUser }, { cache }) => {
      window.localStorage.setItem('user', JSON.stringify(authUser));

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
