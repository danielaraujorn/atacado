import React from 'react';
import { Image, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Container, Text, View } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import useForm from 'react-hook-form';
import { LOGIN } from './gqls.js';
import theme from '../../theme';
import AsyncStorage from '@react-native-community/async-storage';

import { Button, Input, FormGroup, FormItem } from '../../components';

export const LoginComponent = ({ navigation }) => {
  const signInAsync = async ({ loginUser: { id } }) => {
    await AsyncStorage.setItem('userId', id);
    navigation.navigate('App');
  };
  const { register, setValue, handleSubmit } = useForm();
  const [postMutation] = useMutation(LOGIN, {
    onCompleted: signInAsync,
  });
  const login = handleSubmit(variables => postMutation({ variables }));
  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor={theme.brandPrimary}
      />
      <Container
        style={{
          backgroundColor: theme.brandPrimary,
        }}
      >
        <FormGroup style={{ flex: 1, justifyContent: 'center' }}>
          <KeyboardAvoidingView>
            <FormItem>
              <Image
                style={{ resizeMode: 'contain', height: 100 }}
                source={{
                  uri:
                    'https://logodownload.org/wp-content/uploads/2014/07/adidas-logo-branco.png',
                }}
              />
            </FormItem>
            <FormItem topMargin={2}>
              <Input
                light
                autoFocus
                defaultValue='client@email.com'
                returnKeyType='next'
                keyboardType='email-address'
                textContentType='emailAddress'
                ref={register({ name: 'email', required: true })}
                onChangeText={text => setValue('email', text)}
                placeholder='Email'
              />
            </FormItem>
            <FormItem>
              <Input
                light
                defaultValue='12345678a'
                secureTextEntry={true}
                textContentType='password'
                ref={register({ name: 'password', required: true })}
                onChangeText={text => setValue('password', text)}
                placeholder='Senha'
              />
            </FormItem>
            <FormItem>
              <Button inside light onPress={login}>
                <Text>Entrar</Text>
              </Button>
            </FormItem>
            <FormItem>
              <Button transparent>
                <Text style={{ color: 'white', paddingLeft: 25 }}>
                  Não possui conta? Clique aqui
                </Text>
              </Button>
            </FormItem>
            <FormItem last>
              <Button transparent>
                <Text style={{ color: 'white', paddingLeft: 25 }}>
                  Esqueci a senha
                </Text>
              </Button>
            </FormItem>
          </KeyboardAvoidingView>
        </FormGroup>
      </Container>
    </>
  );
};
