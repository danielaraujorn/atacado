import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import theme from '../../../theme';
import { useQuery } from '@apollo/react-hooks';
import { IS_PRODUCT_FAVORITE } from '../gqls';

export const ProductItem = ({ product, navigation }) => {
  const { id, name, description, price, favorite = false, unit } = product;
  const { data = {} } = useQuery(IS_PRODUCT_FAVORITE, { variables: { id } });
  const { isProductFavorite = false } = data;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('Product', { id })}
      style={{
        width: '50%',
        padding: 10,
      }}
    >
      <View>
        <View style={{ flexDirection: 'row-reverse' }}>
          {!!isProductFavorite && (
            <Icon
              style={{
                position: 'absolute',
                zIndex: 1,
                margin: 15,
                color: 'white',
                fontSize: 20,
              }}
              name='heart'
            />
          )}
          <Image
            style={{
              height: 180,
              flex: 1,
              borderRadius: theme.borderRadius,
            }}
            source={{
              uri:
                'https://media.istockphoto.com/photos/vintage-retro-grungy-background-design-and-pattern-texture-picture-id656453072?k=6&m=656453072&s=612x612&w=0&h=4TW6UwMWJrHwF4SiNBwCZfZNJ1jVvkwgz3agbGBihyE=',
            }}
          />
        </View>
        <View style={{ paddingTop: 5, paddingHorizontal: 8 }}>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          {!!description && <Text>{description}</Text>}
          {!!price && (
            <Text style={{ marginTop: 5 }}>
              R${price} {!!unit && 'por ' + unit}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
