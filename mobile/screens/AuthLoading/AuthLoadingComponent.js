import React from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useQuery } from '@apollo/react-hooks';

import theme from '../../theme';
import { GET_OWN_USER } from './gqls';

export const AuthLoadingComponent = ({ navigation }) => {
  const onCompleted = async () => {
    console.log('logged');
    navigation.navigate('App');
  };

  const onError = async () => {
    console.log('not logged');
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };
  console.log('authLoading');
  useQuery(GET_OWN_USER, {
    onCompleted,
    onError,
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });
  return (
    <View
      style={{
        backgroundColor: theme.brandPrimary,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StatusBar
        barStyle='light-content'
        backgroundColor={theme.brandPrimary}
      />
      <ActivityIndicator size='large' color='#FFFFFF55' />
    </View>
  );
};
