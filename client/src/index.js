import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import './index.scss';
import 'antd/dist/antd.css';
import App from './App';
import store from "./store/store";
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    // Provide required constructor fields
    cache: new InMemoryCache(),
    uri: 'http://localhost/graphql/graphql',
    queryDeduplication: false
  });
const options = {
    position: 'top right',
    timeout: 3000,
    offset: '30px',
    transition: 'scale'
  }
ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App /> 
          </AlertProvider>
        </ApolloProvider>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
