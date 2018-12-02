// import gql from 'graphql-tag';

export default {
  Mutation: {
    setIsLogged: (_, { isLogged }, { cache }) => {
      cache.writeData({ data: { isLogged } });
      return isLogged;
    },
  },
};
