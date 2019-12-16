import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

export const GET_CART = gql`
  query getCart {
    getCart(where: { deleted: false }) {
      id
      quantity
      product {
        id
        name
        price
      }
    }
  }
`;

export const GET_CART_COUNT = gql`
  query getCartCount {
    getCartCount(where: { deleted: false })
  }
`;

export const GET_CART_ITEM = gql`
  query getCartItem($productId: ID!) {
    getCartItem(productId: $productId) {
      id
      quantity
      deleted
    }
  }
`;

export const CREATE_CART_ITEM = gql`
  mutation createCartItem($productId: ID!, $quantity: Int!) {
    createCartItem(productId: $productId, quantity: $quantity) {
      id
      quantity
      deleted
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation deleteCartItem($id: ID!) {
    deleteCartItem(id: $id) {
      id
      quantity
      deleted
    }
  }
`;

export const useGetCart = () => useQuery(GET_CART);

export const useGetCartItem = ({ productId }) =>
  useQuery(GET_CART_ITEM, {
    variables: { productId },
    fetchPolicy: 'network-only',
  });

export const useGetCartCount = () => useQuery(GET_CART_COUNT);

export const useCreateCartItem = ({ productId, quantity }) =>
  useMutation(CREATE_CART_ITEM, {
    variables: { productId, quantity },
    update: (cache, { data: { createCartItem: createCartItemData } }) => {
      cache.writeQuery({
        query: GET_CART_ITEM,
        variables: { productId },
        data: { getCartItem: createCartItemData },
      });
      const { getCartCount } = cache.readQuery({
        query: GET_CART_COUNT,
      });
      cache.writeQuery({
        query: GET_CART_COUNT,
        data: { getCartCount: getCartCount + 1 },
      });
    },
  });

export const useDeleteCartItem = ({ id, productId }) =>
  useMutation(DELETE_CART_ITEM, {
    variables: { id },
    update: (cache, { data: { deleteCartItem: deleteCartItemData } }) => {
      cache.writeQuery({
        query: GET_CART_ITEM,
        variables: { productId },
        data: { getCartItem: deleteCartItemData },
      });

      const { getCart } = cache.readQuery({ query: GET_CART });
      cache.writeQuery({
        query: GET_CART,
        data: {
          getCart: getCart.filter(item => item.id !== deleteCartItemData.id),
        },
      });

      const { getCartCount } = cache.readQuery({
        query: GET_CART_COUNT,
      });
      cache.writeQuery({
        query: GET_CART_COUNT,
        data: { getCartCount: getCartCount - 1 },
      });
    },
  });
