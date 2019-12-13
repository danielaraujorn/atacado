import React from 'react';
import { Text, View, Icon } from 'native-base';
import theme from '../../../theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const CartResume = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
      <View
        style={{
          height: 50,
          backgroundColor: theme.brandPrimary,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <Text style={{ color: theme.brandLight }}>7 itens selecionado</Text>
        <Text style={{ color: theme.brandLight, fontSize: 20 }}>R$80,80</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
