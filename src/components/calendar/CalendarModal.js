import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import Swal from 'sweetalert2';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal/lib/components/Modal';

import { customStyles } from './styles/customStyles';
import { closeModal } from '../../actions/uiActions';
import { eventStartAddNew, eventClearActive, eventUpdate } from '../../actions/calendarActions';


Modal.setAppElement('#root');

const dateNow = moment().minutes(0).seconds(0).milliseconds(0).add(1, 'hours');
const dateNowPlus1 = dateNow.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: dateNow.toDate(),
    end: dateNowPlus1.toDate(),
};

export const CalendarModal = () => {
    const dispatch = useDispatch();

    const { activeEvent } = useSelector(state => state.calendar);
    const { isModalOpen } = useSelector(state => state.ui);

    const [isTitleValid, setIsTitleValid] = useState(true);
    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(eventClearActive());
        setFormValues(initEvent);
    };

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e,
        });
    };

    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e,
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'End date must be later than start date', 'error');
        };

        if (title.trim().length < 2) {
            return setIsTitleValid(false);
        };

        if (activeEvent) {
            // Update existent event
            dispatch(eventUpdate(formValues));
        } else {
            // Add new event with temporary id
            dispatch(eventStartAddNew(formValues));
        };

        setIsTitleValid(true);
        handleCloseModal();
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            style={customStyles}
            className='modal'
            overlayClassName='modal-background'
        >
            <h1>{activeEvent ? 'Edit event' : 'New event'}</h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Date and start time</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={start}
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Date and end time</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={end}
                        className='form-control'
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Title and notes</label>
                    <input
                        type="text"
                        className={`form-control ${!isTitleValid && 'is-invalid'}`}
                        placeholder="Title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">A brief description</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    );
};
