import React from 'react';

import { GlobalStyles } from './global';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

import {Redirect, Route, Switch} from 'react-router-dom';

import KTabsProfile from './pages/profilePage';
import KTabsViewer from './pages/tabsPage';
import KTabsEditor from './pages/editorPage';
import KTabsPlayer from './pages/playerPage';
import Error from './pages/errorPage';

import NavBar from './components/navbar';


function App() {

  return (
    <ThemeProvider theme={theme}>
      <>  
        <GlobalStyles />
        <NavBar/>
        <Switch>

          <Route path="/tabs">
            <KTabsViewer/>
          </Route>

          <Route path="/editor">
            <KTabsEditor/>
          </Route>

          <Route path="/profile/:id">
            <KTabsProfile/>
          </Route>

          <Route path="/player/:id">
            <KTabsPlayer/>
          </Route>

          <Route exact path="/">
            <Redirect to="/editor"/>
          </Route>

          <Route exact path="/home">
            <Redirect to="/editor"/>
          </Route>

          <Route exact path="/error">
            <Error/>
          </Route>
        
          <Route>
            <Redirect to="/error"/>
          </Route>


        </Switch>
      </>
    </ThemeProvider>
  );
}

export default App;
