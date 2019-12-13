import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import { ProductItem } from './ProductItem';

export const ProductsList = ({ navigation, products = [] }) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  return (
    <FlatList
      initialNumToRender={8}
      keyExtractor={({ id }) => `${id}`}
      data={products}
      style={{
        width: SCREEN_WIDTH,
        padding: 10,
      }}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductItem product={item} navigation={navigation} />
      )}
    />
  );
};
