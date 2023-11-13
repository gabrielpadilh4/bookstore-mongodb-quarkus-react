import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Keycloak from "keycloak-js";

var initOptions = {
    url: 'http://localhost:8081', 
    realm: 'bookstore', 
    clientId: 'bookstore-frontend', 
    onLoad: 'login-required'
}

const keycloak = new Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {

  if (!auth) {
    window.location.reload();
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <SnackbarProvider>
        <App keycloak={keycloak}/>
      </SnackbarProvider>
    </BrowserRouter>,
  )
  
  localStorage.setItem("react-token", keycloak.token);
  localStorage.setItem("react-refresh-token", keycloak.refreshToken);

  setTimeout(() => {

      keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
              console.debug('Token refreshed' + refreshed);
          } else {
              console.warn('Token not refreshed, valid for '
                  + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
      }).catch(() => {
          console.error('Failed to refresh token');
      });


  }, 60000)

}).catch((error) => {
  console.error(error);
});