import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'native-base';
import {
  Home,
  Login,
  AuthLoading,
  SearchProducts,
  ListProducts,
  Product,
  Cart,
} from '../screens';
import theme from '../theme';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Product: { screen: Product },
    SearchProducts: {
      screen: SearchProducts,
    },
    ListProducts: {
      screen: ListProducts,
    },
    Cart: { screen: Cart, mode: 'modal' },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      drawerLabel: 'Inicio',
      drawerIcon: ({ tintColor }) => (
        <Icon style={{ fontSize: 20, color: tintColor }} name='home' />
      ),
    },
  },
);

const AppNavigation = createDrawerNavigator(
  {
    Home: HomeStack,
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: theme.brandPrimary,
      iconContainerStyle: { marginRight: 0 },
    },
    drawerWidth: 200,
  },
);

// const AppStack = createStackNavigator(
//   {
//     Product: { screen: Product },
//     SearchProducts: {
//       screen: SearchProducts,
//     },
//     ListProducts: {
//       screen: ListProducts,
//     },
//     Cart: { screen: Cart, mode: 'modal' },
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     },
//   },
// );

export const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      App: AppNavigation,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      },
    },
  ),
);
