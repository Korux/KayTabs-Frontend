import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import store from './redux/store';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
<Auth0Provider
    domain="kaytabs.us.auth0.com"
    clientId={"1oduMuPl9UGBxtF1xmIYgwzSZq05EjfH"}
    redirectUri={"http://localhost:3001/editor"}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
  ,
  document.getElementById('root')
);
