import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/home';
import Admin from './components/Admin/admin';
import NotFound404 from './components/Error_Pages/NotFound404';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/admin" exact component={Admin}/>
            <Route path="/404" component={NotFound404} />
            <Redirect to="/404" />
        </Switch>
    )
}

export default Routes;