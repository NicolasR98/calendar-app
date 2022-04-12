import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/calendarActions';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleDeleteNote = () => {
        dispatch(eventStartDelete());
    };

    return (
        <button
            onClick={handleDeleteNote}
            className='btn btn-danger fab fab--delete'
        >
            <i className='fas fa-trash' />
        </button>
    );
};
