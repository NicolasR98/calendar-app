import React, { useState } from 'react';
import moment from 'moment';

import Swal from 'sweetalert2';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal/lib/components/Modal';

import { customStyles } from './styles/customStyles';


Modal.setAppElement('#root');

const dateNow = moment().minutes(0).seconds(0).milliseconds(0).add(1, 'hours');
const dateNowPlus1 = dateNow.clone().add(1, 'hours');

export const CalendarModal = () => {
    const [startDate, setStartDate] = useState(dateNow.toDate());
    const [endDate, setEndDate] = useState(dateNowPlus1.toDate());
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [formValues, setFormValues] = useState({
        title: 'Event',
        notes: '',
        start: startDate,
        end: endDate,
    });

    const { notes, title, start, end } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const closeModal = () => {
        // TODO: close modal
    };

    const handleStartDateChange = (e) => {
        setStartDate(e);
        setFormValues({
            ...formValues,
            start: e,
        });
    };

    const handleEndDateChange = (e) => {
        setEndDate(e);
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

        setIsTitleValid(true);
        closeModal();
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={closeModal}
            closeTimeoutMS={200}
            style={customStyles}
            className='modal'
            overlayClassName='modal-background'
        >
            <h1> New event </h1>
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
