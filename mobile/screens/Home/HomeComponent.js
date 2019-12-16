import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TextInput } from 'react-native';
import { Container, Icon, View, Header, Left, Body, Right } from 'native-base';
import { Button } from '../../components';
import { ProductsList } from '../ListProducts/subComponents';
import { GET_PRODUCTS } from './gqls';
import { normalizeString } from '../../utils/normalizeString';
import { CartResume } from '../Cart';

import theme from '../../theme';
export const HomeComponent = ({ navigation }) => {
  const [text, setText] = useState('');
  const { data = {}, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { text: normalizeString(text) },
  });
  const { getProducts: products } = data;

  return (
    <Container>
      <Header>
        <Left style={{ flex: 0 }}>
          <Button light transparent onPress={() => navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body style={{ flex: 1 }}>
          <View
            style={{
              padding: 0,
              flex: 1,
              margin: 8,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: theme.brandLight,
              borderRadius: theme.borderRadius,
            }}
          >
            <TextInput
              // onBlur={(a, b, c) => console.log(a, b, c)}
              onChangeText={setText}
              style={{
                paddingLeft: 16,
                flex: 1,
                margin: 0,
                height: 40,
                color: theme.brandLight,
              }}
              placeholderTextColor={theme.brandLight + '99'}
              placeholder='O que você procura?'
            />
            <Button transparent light>
              <Icon style={{ fontSize: 18 }} name='search' />
            </Button>
          </View>
        </Body>
        <Right style={{ flex: 0 }}>
          {/* <Button light transparent badgeNumber={5} showBadge>
            <Icon name='funnel' />
          </Button> */}
          <CartResume navigation={navigation} />
        </Right>
      </Header>
      {error || loading || products.length === 0 ? (
        <View style={{ flex: 1 }} />
      ) : (
        <View style={{ backgroundColor: '#eee', flex: 1 }}>
          <ProductsList products={products} navigation={navigation} />
        </View>
      )}
    </Container>
  );
};
