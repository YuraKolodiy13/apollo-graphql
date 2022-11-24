import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:9022/',
  cache: new InMemoryCache(),
});

export default client;