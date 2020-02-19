import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './js/view/Home.jsx';
import Restaurant from './js/view/Restaurant.jsx';

import Navbar from './js/component/NavBar.jsx';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


const Root = () => {
    return (
        <React.Fragment>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path={"/fud"} component={Home} />
                    <Route path="/fud/restaurant/:id" component={Restaurant} />
                    <Redirect from="/fud/restaurant/" to="/fud" />
                </Switch>
            </Router>
        </React.Fragment>
    )
}
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
