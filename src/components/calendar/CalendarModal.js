import moment from 'moment';
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal/lib/components/Modal';


Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const dateNow = moment().minutes(0).seconds(0).add(1, 'hours');
const dateNowPlus1 = dateNow.clone().add(1, 'hours');

export const CalendarModal = () => {
    const [startDate, setStartDate] = useState(dateNow.toDate());
    const [endDate, setEndDate] = useState(dateNowPlus1.toDate());

    const closeModal = () => { };

    const handleStartDateChange = (e) => {
        setStartDate(e);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e);
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
            <form className="container">
                <div className="form-group">
                    <label>Date and start time</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={startDate}
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Date and end time</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={endDate}
                        minDate={startDate}
                        className='form-control'
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Title and notes</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        autoComplete="off"
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
