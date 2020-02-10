import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { Button } from '../../../components';
import theme from '../../../theme';
import { useDeleteCartItem, useCreateCartItem } from '../../../graphql/cart';

export const CartItem = ({ id, product = {}, quantity = 0, navigation }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const { id: productId, name = '', price = 0 } = product;
  const [deleteCartItem] = useDeleteCartItem({ id, productId });
  const [increaseCartItem] = useCreateCartItem({
    productId,
    quantity: localQuantity + 1,
  });
  const [decreaseCartItem] = useCreateCartItem({
    productId,
    quantity: localQuantity - 1,
  });

  const [deleting, setDeleting] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.push('Product', { id: productId })}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 12,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          deleteCartItem();
          setDeleting(true);
        }}
        style={{
          backgroundColor: theme.brandDark,
          position: 'absolute',
          zIndex: 1,
          margin: 10,
          height: 32,
          width: 32,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          padding: 0,
        }}
      >
        <Icon name='close' style={{ fontSize: 18, color: theme.brandLight }} />
      </TouchableOpacity>
      <Image
        style={{
          height: 120,
          width: 120,
          borderRadius: theme.borderRadius,
          opacity: deleting ? 0.5 : 1,
        }}
        source={{
          uri:
            'https://media.istockphoto.com/photos/vintage-retro-grungy-background-design-and-pattern-texture-picture-id656453072?k=6&m=656453072&s=612x612&w=0&h=4TW6UwMWJrHwF4SiNBwCZfZNJ1jVvkwgz3agbGBihyE=',
        }}
      />
      <View
        style={{
          flex: 1,
          minHeight: 120,
          paddingLeft: 10,
          justifyContent: 'center',
          opacity: deleting ? 0.5 : 1,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 6,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              flex: 1,
              marginTop: 6,
              color: theme.brandPrimary,
            }}
          >
            R${price}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              rounded
              bordered
              onPress={() => {
                setLocalQuantity(localQuantity - 1);
                decreaseCartItem();
              }}
            >
              <Icon name='arrow-dropleft' />
            </Button>
            <Text
              style={{
                marginHorizontal: 6,
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              {localQuantity}
            </Text>
            <Button
              rounded
              bordered
              onPress={() => {
                setLocalQuantity(localQuantity + 1);
                increaseCartItem();
              }}
            >
              <Icon name='arrow-dropright' />
            </Button>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
