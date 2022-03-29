import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/uiActions';

export const AddNewEventFab = () => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal());
    };

    return (
        <button
            className='btn btn-primary fab'
            onClick={handleOpenModal}
        >
            <i className='fas fa-plus' />
        </button>
    );
};
