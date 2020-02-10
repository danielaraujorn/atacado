/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  Text,
  Content,
  View,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Title,
} from 'native-base';
import { Button } from '../../components';
import { useGetCart } from '../../graphql/cart';
import theme from '../../theme';
import { CartItem } from './subComponents';

export const Cart = ({ navigation }) => {
  const { data = {}, loading, error } = useGetCart();
  const { getCart = [] } = data;

  const cartGroups = useMemo(
    () =>
      getCart.reduce((acc, { items = [], ...group }) => {
        const filteredItems = items.filter(({ deleted }) => !deleted);
        if (filteredItems.length > 0)
          return [...acc, { ...group, items: filteredItems }];
        return acc;
      }, []),
    [getCart],
  );

  const subTotal = cartGroups.reduce(
    (acc, { items }) =>
      acc +
      items.reduce(
        (accItems, { product, quantity }) =>
          accItems + (product.price || 0) * quantity,
        0,
      ),
    0,
  );

  const freightInProgress = () =>
    cartGroups.some(({ freightStatus }) => freightStatus === 'NULL');

  const totalFreight = useMemo(
    () => cartGroups.reduce((acc, { freight }) => acc + freight, 0),
    [cartGroups],
  );

  const total = useMemo(() => totalFreight + subTotal, [
    subTotal,
    totalFreight,
  ]);

  return (
    <Container
      style={{ backgroundColor: cartGroups.length > 1 ? '#eee' : undefined }}
    >
      <Header>
        <Left>
          <Button light transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Carrinho</Title>
        </Body>
        <Right />
      </Header>
      {loading || error || !cartGroups.length ? null : (
        <>
          <Content>
            <View style={{ padding: 8 }}>
              {cartGroups.length > 1
                ? cartGroups.map(group => (
                    <CartGroup
                      navigation={navigation}
                      key={group.id}
                      group={group}
                    />
                  ))
                : cartGroups[0].items.map(
                    ({ id: itemId, product, quantity }) => (
                      <CartItem
                        navigation={navigation}
                        key={itemId}
                        id={itemId}
                        product={product}
                        quantity={quantity}
                      />
                    ),
                  )}
            </View>
          </Content>
          <View
            style={{
              backgroundColor: theme.brandLight,
              borderTopColor: '#00000022',
              borderTopWidth: 1,
              padding: 24,
              alignItems: 'center',
            }}
          >
            <View style={{ maxWidth: 340 }}>
              <SubPrice title='Subtotal'>{'R$' + subTotal}</SubPrice>
              <SubPrice title='Frete'>
                {freightInProgress ? 'Esperando' : 'R$' + totalFreight}
              </SubPrice>
              <Price title='Total'>
                {freightInProgress ? subTotal : 'R$' + total}
              </Price>
              <Button inside onPress={() => console.log('orçamento')}>
                <Text>Pedir orçamento</Text>
              </Button>
            </View>
          </View>
        </>
      )}
    </Container>
  );
};

const CartGroup = ({ group, navigation }) => {
  const { id, store = {}, items = [], freight } = group;
  const { name = '' } = store;
  const subtotal = useMemo(
    () => items.reduce((acc, { product }) => acc + (product.price || 0), 0),
    [items],
  );
  return (
    <View
      key={id}
      style={{
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: theme.borderRadius,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          padding: 10,
        }}
      >
        <TouchableOpacity
          // onPress={deleteCartItem}
          style={{
            // backgroundColor: theme.brandDark,
            height: 32,
            width: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            padding: 0,
          }}
        >
          <Icon name='trash' style={{ fontSize: 18, color: theme.brandDark }} />
        </TouchableOpacity>
        <Text style={{ paddingHorizontal: 15, fontSize: 20 }}>{name}</Text>
      </View>

      {items.map(({ id: itemId, product, quantity }) => (
        <CartItem
          navigation={navigation}
          key={itemId}
          id={itemId}
          product={product}
          quantity={quantity}
        />
      ))}
      <View
        style={{
          borderTopColor: '#00000022',
          borderTopWidth: 1,
          paddingHorizontal: 24,
          paddingVertical: 16,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            maxWidth: 340,
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <SubPrice title='Subtotal'>{subtotal}</SubPrice>
          <SubPrice title='Frete'>{freight}</SubPrice>
        </View>
      </View>
    </View>
  );
};

const SubPrice = ({ title, children }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 2,
      paddingHorizontal: 8,
      opacity: 0.7,
    }}
  >
    <Text
      style={{
        color: theme.brandDark,
      }}
    >
      {title}:
    </Text>
    <Text
      style={{
        color: theme.brandDark,
      }}
    >
      {children}
    </Text>
  </View>
);

const Price = ({ title, children }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 8,
    }}
  >
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 24,
        color: theme.brandDark,
      }}
    >
      {title}:
    </Text>
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 24,
        color: theme.brandDark,
      }}
    >
      {children}
    </Text>
  </View>
);
