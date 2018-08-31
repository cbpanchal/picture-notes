import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Notification from "./notification/NotificationSystem";

import store from "./store/store";
import WrappedComponent from "./hoc/WrappedComponent";

import Home from "./containers/home/Home";
import LoginContainer from "./containers/login/LoginContainer";
import SignUpContainer from "./containers/login/SignUpContainer";
import Header from "./containers/header/HeaderContainer";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Notification />
        <Header />
        <Switch>
          <Route exact path="/" component={WrappedComponent(Home)} />
          <Route path="/login" component={WrappedComponent(LoginContainer)} />
          <Route path="/signup" component={WrappedComponent(SignUpContainer)} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
