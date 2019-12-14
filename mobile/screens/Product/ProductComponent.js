import React from 'react';
import { Dimensions } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Container, Text, Content, Icon, H1, View } from 'native-base';
import theme from '../../theme';
import { Button, Header } from '../../components';
import { CartResume } from '../Cart';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRODUCT, IS_PRODUCT_FAVORITE, INSERT_FAVORITE } from './gqls';

const images = [
  'http://placeimg.com/640/480/any',

  'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',

  'https://cdn.pixabay.com/photo/2018/05/28/22/11/message-in-a-bottle-3437294__340.jpg',
];

export const ProductComponent = ({ navigation }) => {
  const productId = navigation.getParam('id');
  const { data = {}, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });
  const { data: favoriteData } = useQuery(IS_PRODUCT_FAVORITE, {
    variables: { id: productId },
  });
  const { isProductFavorite = false } = favoriteData;

  const [toggleFavorite] = useMutation(INSERT_FAVORITE, {
    variables: { id: productId },
    optimisticResponse: {
      toggleFavorite: !isProductFavorite,
    },
    update: (cache, { data: { toggleFavorite: toogleFavoriteData } }) => {
      cache.writeQuery({
        query: IS_PRODUCT_FAVORITE,
        variables: { id: productId },
        data: { isProductFavorite: toogleFavoriteData },
      });
    },
  });

  if (loading || error) return null;

  const { getProduct: product = {} } = data;
  const { name, price, description, unit } = product;
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  return (
    <Container>
      <Header>
        <View>
          <Button light transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.brandLight, fontSize: 18 }}>Produto</Text>
        </View>
        <Button light transparent onPress={toggleFavorite}>
          <Icon name={isProductFavorite ? 'heart' : 'heart-empty'} />
        </Button>
        <CartResume />
      </Header>
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
      <Content style={{ padding: 20 }}>
        <H1>{name}</H1>
        <Text style={{ color: theme.brandPrimary, fontWeight: 'bold' }}>
          R${price} por {unit}
        </Text>
        {!!description && <Text style={{ marginTop: 15 }}>{description}</Text>}
        <Button bordered inside style={{ marginTop: 30 }}>
          <Text>Quantidade: 1</Text>
        </Button>
        <Button inside style={{ marginTop: 15 }}>
          <Text>Adicionar do carrinho</Text>
        </Button>
      </Content>
    </Container>
  );
};
