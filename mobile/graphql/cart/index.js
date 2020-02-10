import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

export const GET_CART = gql`
  query getCart {
    getCart(where: { items_some: { deleted: false } }) {
      id
      freight
      freightStatus
      store {
        id
        name
      }
      items {
        id
        deleted
        quantity
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const GET_CART_COUNT = gql`
  query getCartItemCount {
    getCartItemCount(where: { deleted: false })
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
      product {
        store {
          id
        }
        id
      }
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

export const useGetCartItemCount = () => useQuery(GET_CART_COUNT);

export const useCreateCartItem = ({ productId, quantity }) =>
  useMutation(CREATE_CART_ITEM, {
    variables: { productId, quantity },
    update: (cache, { data: { createCartItem: createCartItemData } }) => {
      const { getCart = [] } = cache.readQuery({ query: GET_CART }) || {};
      const alreadyExist = getCart.some(({ items }) =>
        items.some(cartItem => cartItem.id === createCartItemData.id),
      );
      if (alreadyExist) {
        cache.writeQuery({
          query: GET_CART,
          data: {
            getCart: getCart.map(({ items, ...group }) => ({
              ...group,
              items: items.map(item =>
                item.id === createCartItemData.id
                  ? { ...item, quantity }
                  : item,
              ),
            })),
          },
        });
      }
      cache.writeQuery({
        query: GET_CART_ITEM,
        variables: { productId },
        data: { getCartItem: createCartItemData },
      });
      if (!alreadyExist) {
        const { getCartItemCount } = cache.readQuery({
          query: GET_CART_COUNT,
        });
        cache.writeQuery({
          query: GET_CART_COUNT,
          data: { getCartItemCount: getCartItemCount + 1 },
        });
      }
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

      const { getCart = [] } = cache.readQuery({ query: GET_CART }) || {};

      cache.writeQuery({
        query: GET_CART,
        data: {
          getCart: getCart.map(({ items, ...group }) => ({
            ...group,
            items: items.map(item =>
              item.id === deleteCartItemData.id
                ? { ...item, deleted: true }
                : item,
            ),
          })),
        },
      });

      const { getCartItemCount } = cache.readQuery({
        query: GET_CART_COUNT,
      });
      cache.writeQuery({
        query: GET_CART_COUNT,
        data: { getCartItemCount: getCartItemCount - 1 },
      });
    },
  });
