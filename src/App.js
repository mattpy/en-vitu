import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from './App.css';

import Layout from './containers/Layout/Layout';
import News from './containers/News/News';
import Stocks from './containers/Stocks/Stocks';
import Weather from './containers/Weather/Weather';

function App() {
  return (
    <div className={classes.App}>
      <Layout />
        <Switch>
          {/* <Route path='/' exact render={() => <div>Home component!! Under construction mane</div>} /> */}
          <Route path='/news' component={News} />
          <Route path='/stocks' component={Stocks} />
          <Route path='/weather' component={Weather} />
          <Redirect to='/news' />
        </Switch>
    </div>
  );
}

export default App;
