import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store/store';
import WrappedComponent from "./hoc/WrappedComponent";

import Home from './containers/home/Home';
import Login from './containers/login/LoginContainer';
import Signup from './containers/login/SignUpContainer';
import './App.css';
import SignUp from './components/login/SignUp';

const App = () => (
  <Provider store = {store}>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ WrappedComponent(Home) } />
          <Route path="/login" component={ WrappedComponent(Login) } />
          <Route path="/signup" component={ WrappedComponent(SignUp) } />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
