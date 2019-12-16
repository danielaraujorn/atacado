import React from 'react';
import { Icon } from 'native-base';
import { Button } from '../../components';
import { useGetCartCount } from '../../graphql/cart';

export const CartResume = ({ navigation }) => {
  const { data = {} } = useGetCartCount();
  const { getCartCount: count = 0 } = data;
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
