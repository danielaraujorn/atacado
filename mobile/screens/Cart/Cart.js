import React, { useMemo } from 'react';
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
  const { getCart: cartItems = [] } = data;

  const subTotal = useMemo(
    () =>
      cartItems.reduce((acc = 0, { product = {}, quantity = 0 }) => {
        const { price = 0 } = product;
        return acc + price * quantity;
      }, 0),
    [cartItems],
  );

  const fee = 0;

  const total = useMemo(() => fee + subTotal, [subTotal, fee]);

  if (loading || error) return null;
  return (
    <Container>
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
      {loading || error ? null : (
        <>
          <Content style={{ padding: 8 }}>
            {cartItems.map(({ id, product, quantity }) => (
              <CartItem
                key={id}
                id={id}
                product={product}
                quantity={quantity}
              />
            ))}
          </Content>
          <View
            style={{
              borderTopColor: '#00000022',
              borderTopWidth: 1,
              padding: 24,
              alignItems: 'center',
            }}
          >
            <View style={{ maxWidth: 340 }}>
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
                  Subtotal:
                </Text>
                <Text
                  style={{
                    color: theme.brandDark,
                  }}
                >
                  R${subTotal}
                </Text>
              </View>
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
                  Frete:
                </Text>
                <Text
                  style={{
                    color: theme.brandDark,
                  }}
                >
                  R${fee}
                </Text>
              </View>
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
                  Total:
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 24,
                    color: theme.brandDark,
                  }}
                >
                  R${total}
                </Text>
              </View>
              <Button inside>
                <Text>Pedir orçamento</Text>
              </Button>
            </View>
          </View>
        </>
      )}
    </Container>
  );
};
