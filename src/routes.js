import React from 'react';
import { Route, Router } from 'react-router-dom';
import * as Screens from './Screens';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={(props) => 
            <Screens.Home auth={auth} {...props} />}>
          </Route>
          <Route path="/emotions" render={(props) => 
            <Screens.Emotion auth={auth} {...props} />}>
          </Route>
          <Route path="/bus" render={(props) => 
            <Screens.BusSearch auth={auth} {...props} />}>
          </Route>
          <Route path="/movie" render={(props) => 
            <Screens.Movies auth={auth} {...props} />}>
          </Route>
          <Route path="/translate" render={(props) => 
            <Screens.Translate auth={auth} {...props} />}>
          </Route>
          <Route path="/gifs" render={(props) => 
            <Screens.Gifs auth={auth} {...props} />}>
          </Route>
          <Route path="/space" render={(props) => 
            <Screens.Space auth={auth} {...props} />}>
          </Route>
          <Route path="/add" render={(props) => 
            <Screens.Add auth={auth} {...props} />}>
          </Route>


          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}

