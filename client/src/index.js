// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import App from './App';
// import Auth from './utils/Auth';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:5000/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = Auth.getToken();
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
//   document.getElementById('root')
// );
