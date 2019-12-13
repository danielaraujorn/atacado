import gql from 'graphql-tag';

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      unit
      description
    }
  }
`;
