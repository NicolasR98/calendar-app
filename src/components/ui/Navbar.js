import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/authActions';
import { eventClearAll } from '../../actions/calendarActions';

export const Navbar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(eventClearAll());
    };

    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-3 sticky-top'>
            <span className='navbar-brand'>
                {name}
            </span>

            <button
                className='btn btn-outline-danger'
                onClick={handleLogout}
            >
                <i className='fas fa-sign-out-alt' />
                <span>Logout</span>
            </button>
        </div>
    );
};
