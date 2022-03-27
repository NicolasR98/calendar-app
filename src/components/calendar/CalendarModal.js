import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';

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

Modal.setAppElement('#root');

export const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            closeTimeoutMS={200}
            style={customStyles}
            className='modal'
            overlayClassName='modal-background'
        >
            <h1>Hello there</h1>
            <hr />
            <span>Enim ipsum mollit duis minim sunt nulla quis minim aliquip culpa ullamco qui reprehenderit.</span>
        </Modal>
    );
};
