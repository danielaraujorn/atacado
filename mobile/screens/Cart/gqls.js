import gql from 'graphql-tag';

export const GET_CART_COUNT = gql`
  query getCartCount {
    getCartCount {
      count
    }
  }
`;
