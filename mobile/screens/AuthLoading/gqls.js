import gql from 'graphql-tag';

export const GET_OWN_USER = gql`
  query getOwnUser {
    getOwnUser {
      id
    }
  }
`;
