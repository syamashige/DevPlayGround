import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import reducers from './Reducers';
import * as Screens from './Screens';
import registerServiceWorker from './registerServiceWorker';



const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
  );



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={Screens.Home} />
      </div>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();