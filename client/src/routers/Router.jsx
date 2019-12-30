import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// local import
import LoginComponent from '../pages/login/Login';
import RegisterComponent from '../pages/register/Register';
import HomeComponent from '../pages/home/Home';
import Restaurant from '../pages/restaurant/Restaurant';
import AdminPage from '../pages/admin/Admin';
import ProtectedRoute from './ProtectedRouter';

// router component
class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                 <Switch>
                 { <ProtectedRoute path='/admin-home' component={AdminPage} role={"admin"} />}
                    <Route path='/register' component={ RegisterComponent } />
                    <Route path='/restaurant/:restaurantId' component={ Restaurant } />
                    <Route path='/login' component={ LoginComponent } />
                    <Route exact path='/' component={ HomeComponent}/>
                    <Redirect from='*' to='/' />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;