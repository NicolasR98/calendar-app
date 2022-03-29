import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDelete } from '../../actions/calendarActions';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleDeleteNote = () => {
        dispatch(eventDelete());
    };

    return (
        <button
            className='btn btn-danger fab fab--delete'
            onClick={handleDeleteNote}
        >
            <i className='fas fa-trash' />
        </button>
    );
};
