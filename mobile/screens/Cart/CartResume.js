import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Icon } from 'native-base';
import { Button } from '../../components';
import { GET_CART_COUNT } from './gqls';

export const CartResume = () => {
  const { data = {} } = useQuery(GET_CART_COUNT);
  const { getCartCount: count = 0 } = data;
  return (
    <Button transparent light badgeNumber={count} showBadge={count > 0}>
      <Icon name='cart' />
    </Button>
  );
};
