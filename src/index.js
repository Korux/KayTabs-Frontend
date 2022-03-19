import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import store from './redux/store';

import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import globalVars from './global';

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
<Auth0Provider
    domain="kaytabs.us.auth0.com"
    clientId={"1oduMuPl9UGBxtF1xmIYgwzSZq05EjfH"}
    redirectUri={globalVars.url}
  >
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </Auth0Provider>
  ,
  document.getElementById('root')
);
