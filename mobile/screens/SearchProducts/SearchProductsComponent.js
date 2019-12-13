import React, { useState, useEffect } from 'react';
// import uuid from 'react-native-uuid';
// import { Chat } from '../../components/Chat';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Container, Icon, H1, Text, View } from 'native-base';
import { useQuery } from '@apollo/react-hooks';
import theme from '../../theme';
import { Button, Input, FormGroup, FormItem } from '../../components';
import { GET_CATEGORIES } from './gqls';

export const SearchProductsComponent = ({ navigation }) => {
  const { data = {}, loading, error } = useQuery(GET_CATEGORIES);
  if (loading || error) return null;
  const { getCategories: categories = [] } = data;
  return (
    <Container style={{ backgroundColor: theme.brandLight }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.brandLight} />
      <FormGroup>
        <FormItem>
          <H1
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              width: '70%',
              padding: 10,
              paddingTop: 0,
            }}
          >
            O que você está procurando?
          </H1>
        </FormItem>
        <FormItem>
          <Input
            rightButton={{
              Icon: { name: 'search' },
              Fab: { onPress: () => {} },
            }}
            // ref={register({ name: 'email', required: true })}
            // onChangeText={text => setValue('email', text)}
            placeholder='Escreva alguma coisa'
          />
        </FormItem>
        <FormItem topMargin={2} last>
          <Text style={{ padding: 10 }}>Aqui estão algumas sugestões:</Text>
        </FormItem>
        <View
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          {categories.map(({ id, name }) => (
            <Option
              key={id}
              icon='arrow-back'
              text={name}
              onPress={() => console.log('categoria de nome: ' + name)}
            />
          ))}
        </View>
      </FormGroup>
    </Container>
  );
};

const Option = ({ icon, text, onPress }) => (
  <View
    style={{
      width: '50%',
      padding: 6,
    }}
  >
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View
        style={{
          borderWidth: 2,
          borderColor: theme.brandPrimary + 'AA',
          borderRadius: theme.borderRadius,
          padding: 25,
        }}
      >
        <Icon
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: theme.brandPrimary,
          }}
          name={icon}
        />
        <Text
          style={{
            marginTop: 5,
            textAlign: 'center',
            color: theme.brandPrimary,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);
