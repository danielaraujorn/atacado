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

export const IS_PRODUCT_FAVORITE = gql`
  query isProductFavorite($id: ID!) {
    isProductFavorite(id: $id)
  }
`;

export const INSERT_FAVORITE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id)
  }
`;
