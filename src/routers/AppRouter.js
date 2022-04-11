import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { startChecking } from '../actions/authActions';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';


export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h5>Loading...</h5>;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path='/login'
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute
                        exact
                        path='/'
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                    />

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
};
