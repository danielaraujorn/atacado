import React from 'react';
import {
  Container,
  Text,
  Button,
  Content,
  View,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Title,
} from 'native-base';

export const Cart = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Carrinho</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Content>
    </Container>
  );
};

const Item = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#00000020',
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          width: '50%',
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nome aqui</Text>
        <Text
          style={{
            // fontWeight: 'bold',
            fontSize: 18,
            marginTop: 6,
            // color: theme.brandSuccess,
          }}
        >
          R$50.00
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button transparent style={{ marginRight: 6 }}>
          <Icon style={{ color: '#00000044' }} name='close' />
        </Button>
        <Button transparent>
          <Icon name='remove' />
        </Button>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          200
        </Text>
        <Button transparent>
          <Icon name='add' />
        </Button>
      </View>
    </View>
  );
};
