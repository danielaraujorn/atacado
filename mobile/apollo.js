import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
const REACT_APP_HOST = 'http://8822fcb9.ngrok.io/graphql';
const REACT_APP_WSHOST = 'ws://192.168.1.5:4000/graphql';

const hasSubscriptionOperation = ({ query: { definitions }, getContext }) => {
  const { ws = false } = getContext();
  return (
    ws ||
    definitions.some(
      ({ kind, operation }) =>
        kind === 'OperationDefinition' && operation === 'subscription',
    )
  );
};

const subscriptionClient = new SubscriptionClient(REACT_APP_WSHOST, {
  reconnect: true,
  lazy: true,
});

const wsLink = new WebSocketLink(subscriptionClient);

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions, locations, path }) => {
      if (extensions.code === 'UNAUTHENTICATED') {
        console.log('deslogado');
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const splitLink = split(
  hasSubscriptionOperation,
  wsLink,
  createHttpLink({
    uri: REACT_APP_HOST,
    fetchOptions: {
      credentials: 'include',
    },
  }),
);

const link = ApolloLink.from([errorLink, splitLink]);

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      default:
        return object.id || defaultDataIdFromObject(object); // fall back to default handling
    }
  },
});

export const client = new ApolloClient({
  link,
  cache,
  resolvers: {},
});
