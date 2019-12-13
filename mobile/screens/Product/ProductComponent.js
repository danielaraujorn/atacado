import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Container, Text, Content, Icon, H1, View } from 'native-base';
import theme from '../../theme';
import { Button } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT } from './gqls';

const images = [
  'http://placeimg.com/640/480/any',

  'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',

  'https://cdn.pixabay.com/photo/2018/05/28/22/11/message-in-a-bottle-3437294__340.jpg',
];

export const ProductComponent = ({ navigation }) => {
  const productId = navigation.getParam('id');
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });
  if (loading || error) return null;
  const { getProduct: product = {} } = data;
  const { name, price, description, unit } = product;
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor={theme.brandPrimary}
      />
      <View
        style={{
          // position: 'absolute',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          padding: 2,
          backgroundColor: theme.brandPrimary,
          // paddingBottom: 26,
        }}
      >
        <View>
          <Button light transparent onPress={() => navigation.goBack()}>
            <Icon style={{ fontSize: 26 }} name='arrow-back' />
          </Button>
        </View>
        <View>
          <Button light transparent>
            <Icon style={{ fontSize: 26, color: 'red' }} name='heart' />
          </Button>
        </View>
      </View>
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
