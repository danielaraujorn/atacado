import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($categoryId: ID!) {
    getProducts(where: { categories_some: { id: $categoryId } }) {
      id
      name
      price
      unit
    }
  }
`;

export const IS_PRODUCT_FAVORITE = gql`
  query isProductFavorite($id: ID!) {
    isProductFavorite(id: $id)
  }
`;
