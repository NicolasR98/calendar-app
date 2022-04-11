import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { startChecking } from '../actions/authActions';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';


export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h5>Loading...</h5>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/login' component={LoginScreen} />
                    <Route exact path='/' component={CalendarScreen} />

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
};
