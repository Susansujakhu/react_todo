import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './Todo/HomePage';
class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <HomePage/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Routes;