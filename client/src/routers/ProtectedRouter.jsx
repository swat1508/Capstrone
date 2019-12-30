import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute= ({component: Component, role, ...rest})=> {
    return (
        <Route {...rest} render={props => {
            const currentUser = localStorage.getItem('currentUser');
            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', from: props.location }} />
            }
            const userAccess=JSON.parse(currentUser).role;
            // check if route is restricted by role
            if (role && role===userAccess) {
                // authorised so return component
                return <Component {...props} />
            }
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }} />
    )
}
export default ProtectedRoute;