import React from 'react';
import { Icon } from 'native-base';
import { Button } from '../../components';
import { useGetCartItemCount, useGetCart } from '../../graphql/cart';

export const CartResume = ({ navigation }) => {
  const { data = {} } = useGetCartItemCount();
  useGetCart();
  const { getCartItemCount: count = 0 } = data;
  return (
    <Button
      transparent
      light
      badgeNumber={count}
      onPress={() => navigation.navigate('Cart')}
      showBadge={count > 0}
    >
      <Icon name='cart' />
    </Button>
  );
};
