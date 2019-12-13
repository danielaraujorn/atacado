import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Text, View, Icon } from 'native-base';
import theme from '../../theme';
import { Button } from '../../components';
import { CartResume } from './subComponents';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORIES } from './gqls';
import { CategoriesList } from './subComponents';

export const ListProductsComponent = ({ navigation }) => {
  const {
    data: categoriesData = {},
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES);

  const { getCategories: categories } = categoriesData;
  return (
    <Container>
      <StatusBar barStyle='dark-content' backgroundColor={theme.brandLight} />
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon style={{ fontSize: 30 }} name='arrow-back' />
        </Button>
        <Text
          style={{
            fontSize: 22,
            color: theme.brandPrimary,
          }}
        >
          alguma coisa
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          <Button transparent onPress={() => navigation.push('SearchProducts')}>
            <Icon style={{ fontSize: 30 }} name='search' />
          </Button>
        </View>
      </View>
      {categoriesError || categoriesLoading || categories.length === 0 ? (
        <View style={{ flex: 1 }} />
      ) : (
        <CategoriesList categories={categories} navigation={navigation} />
      )}
      <CartResume navigation={navigation} />
    </Container>
  );
};
