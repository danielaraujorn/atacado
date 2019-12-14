import React from 'react';
import { StatusBar } from 'react-native';
import { View } from 'native-base';
import theme from '../../theme';
export const Header = props => (
  <>
    <StatusBar
      animated
      barStyle='light-content'
      backgroundColor={theme.brandPrimary}
    />
    <View
      style={{
        backgroundColor: theme.brandPrimary,
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
      }}
      {...props}
    />
  </>
);
