import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { history, helmetApp } from '+utils';
import Document from '+pages/Document';

const App = () => {
  const helmetProps = { ...helmetApp.head };
  return (
    <Router history={history}>
      <Helmet helmetProps={helmetProps} />
      <Switch>
        <Route path="/" component={Document} key="auth01" />
        <Redirect path="/" key="auth02" to="/" />,
      </Switch>
    </Router>
  );
};

export default App;
