import React, { useState, useEffect, useMemo } from 'react';
import { Dimensions, KeyboardAvoidingView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import {
  Container,
  Text,
  Content,
  Icon,
  H1,
  View,
  Header,
  Title,
  Left,
  Body,
  Right,
  Input,
  Item,
  Label,
  Button,
} from 'native-base';
import theme from '../../theme';
import { CartResume } from '../Cart';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRODUCT, IS_PRODUCT_FAVORITE, INSERT_FAVORITE } from './gqls';
import {
  useCreateCartItem,
  useDeleteCartItem,
  useGetCartItem,
} from '../../graphql/cart';

const images = [
  'http://placeimg.com/640/480/any',

  'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',

  'https://cdn.pixabay.com/photo/2018/05/28/22/11/message-in-a-bottle-3437294__340.jpg',
];

export const ProductComponent = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);

  const editQuantity = newValue => () =>
    setQuantity(newValue > 1 ? newValue : 1);

  const id = navigation.getParam('id');

  const { data = {}, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  const { data: favoriteData = {} } = useQuery(IS_PRODUCT_FAVORITE, {
    variables: { id },
  });
  const { isProductFavorite = false } = favoriteData;

  const [toggleFavorite] = useMutation(INSERT_FAVORITE, {
    variables: { id },
    optimisticResponse: {
      toggleFavorite: !isProductFavorite,
    },
    update: (cache, { data: { toggleFavorite: toogleFavoriteData } }) =>
      cache.writeQuery({
        query: IS_PRODUCT_FAVORITE,
        variables: { id },
        data: { isProductFavorite: toogleFavoriteData },
      }),
  });

  const { data: cartItemData = {}, loading: loadingCartItem } = useGetCartItem({
    productId: id,
  });
  const { getCartItem: cartItem = {} } = cartItemData;

  const {
    id: cartItemId,
    quantity: cartItemQuantity,
    deleted: deletedCartItem,
  } = cartItem;

  const [createCartItem] = useCreateCartItem({
    productId: id,
    quantity: Number(quantity),
  });

  const [deleteCartItem] = useDeleteCartItem({ id: cartItemId, productId: id });

  useEffect(() => {
    if (cartItemQuantity) {
      setQuantity(cartItemQuantity);
    }
  }, [cartItemQuantity, setQuantity]);

  const { getProduct: product = {} } = data;
  const { name, price, description, unit } = product;
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  const [actionButtonText, actionButtonProps] = useMemo(() => {
    if (!deletedCartItem && cartItemId) {
      if (cartItemQuantity !== quantity)
        return ['Alterar quantidade', { onPress: createCartItem }];
      else
        return [
          'Remover do carrinho',
          { onPress: deleteCartItem, bordered: true },
        ];
    } else return ['Adicionar do carrinho', { onPress: createCartItem }];
  }, [
    cartItemId,
    cartItemQuantity,
    createCartItem,
    deleteCartItem,
    deletedCartItem,
    quantity,
  ]);

  return (
    <Container>
      <Header>
        <Left>
          <Button light transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Produto</Title>
        </Body>
        <Right>
          <Button light transparent onPress={toggleFavorite}>
            <Icon name={isProductFavorite ? 'heart' : 'heart-empty'} />
          </Button>
          <CartResume navigation={navigation} />
        </Right>
      </Header>
      {loading || error ? null : (
        <>
          <Content>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <SliderBox
                images={images}
                sliderBoxHeight={SCREEN_HEIGHT / 2}
                dotColor={'#00000000'}
                inactiveDotColor={'#00000000'}
              />
              <View style={{ position: 'absolute' }}>
                <Text
                  style={{
                    zIndex: 1,
                    margin: 15,
                    backgroundColor: theme.brandLight + 'dd',
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    fontSize: 14,
                    borderRadius: 5,
                  }}
                >
                  {images.length || 0} fotos
                </Text>
              </View>
            </View>
            <View style={{ padding: 20 }}>
              <H1>{name}</H1>
              <Text style={{ color: theme.brandPrimary, fontWeight: 'bold' }}>
                R${price} por {unit}
              </Text>
              {!!description && (
                <Text style={{ marginTop: 15 }}>{description}</Text>
              )}
              {!loadingCartItem && (
                <>
                  <KeyboardAvoidingView style={{ marginTop: 30 }}>
                    <Label>Quantidade:</Label>
                    <Item style={{ padding: 4 }}>
                      <Button
                        rounded
                        bordered
                        onPress={editQuantity(quantity - 1)}
                      >
                        <Icon name='remove' />
                      </Button>
                      <Input
                        onChangeText={text => editQuantity(Number(text))()}
                        style={{ textAlign: 'center' }}
                        keyboardType='number-pad'
                        value={String(quantity)}
                      />
                      <Button
                        rounded
                        bordered
                        onPress={editQuantity(quantity + 1)}
                      >
                        <Icon name='add' />
                      </Button>
                    </Item>
                  </KeyboardAvoidingView>

                  <Button
                    style={{ marginTop: 15 }}
                    rounded
                    block
                    {...actionButtonProps}
                  >
                    <Text>{actionButtonText}</Text>
                  </Button>
                </>
              )}
            </View>
          </Content>
        </>
      )}
    </Container>
  );
};
