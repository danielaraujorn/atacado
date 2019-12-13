import React from 'react';
import { StyleProvider } from 'native-base';
import { ApolloProvider } from '@apollo/react-hooks';
import { YellowBox } from 'react-native';
import getTheme from './theme/components';
import theme from './theme';
import { Navigator } from './Navigator';
import { client } from './apollo';

const App = () => {
  YellowBox.ignoreWarnings(['Remote debugger']);
  return (
    <ApolloProvider client={client}>
      <StyleProvider style={getTheme(theme)}>
        <Navigator />
      </StyleProvider>
    </ApolloProvider>
  );
};

export default App;
