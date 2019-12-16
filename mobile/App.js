import React, { useRef, useEffect, useCallback } from 'react';
import { StyleProvider } from 'native-base';
import { ApolloProvider } from '@apollo/react-hooks';
import { YellowBox } from 'react-native';
import getTheme from './theme/components';
import theme from './theme';
import { Navigator } from './Navigator';
import { client } from './apollo';
import { EventRegister } from 'react-native-event-listeners';

const App = () => {
  YellowBox.ignoreWarnings(['Remote debugger']);
  const navigatorRef = useRef(null);

  const navigate = useCallback(
    route => {
      if (navigatorRef.current) {
        console.log('listening moving to ' + route);
        navigatorRef.current._navigation.navigate(route);
      }
    },
    [navigatorRef],
  );

  useEffect(() => {
    const listener = EventRegister.addEventListener('Navigate', navigate);
    return () => EventRegister.removeEventListener(listener);
  }, [navigatorRef]);
  return (
    <ApolloProvider client={client}>
      <StyleProvider style={getTheme(theme)}>
        <Navigator ref={navigatorRef} />
      </StyleProvider>
    </ApolloProvider>
  );
};

export default App;
