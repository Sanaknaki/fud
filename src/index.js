import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './js/view/Home.jsx';
import Restaurant from './js/view/Restaurant.jsx';
import Huh from './js/view/Huh.jsx';
import Navbar from './js/component/NavBar.jsx';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


const Root = () => {
    return (
        <React.Fragment>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/restaurant/:id" component={Restaurant} />
                    <Route path="/huh/" component={Huh} />
                    <Redirect from="/restaurant/" to="/" />
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
