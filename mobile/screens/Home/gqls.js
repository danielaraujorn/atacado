import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query getProducts($text: String) {
    getProducts(
      where: {
        OR: [
          { normalizedName_starts_with: $text }
          { normalizedName_contains: $text }
        ]
      }
    ) {
      id
      name
      price
      unit
    }
  }
`;
