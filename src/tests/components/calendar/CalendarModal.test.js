import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { eventStartUpdating } from '../../../actions/calendarActions';

jest.mock('../../../actions/calendarActions', () => ({
    eventStartUpdating: jest.fn(),
    eventStartLoading: jest.fn(),
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const dateNow = moment().minutes(0).seconds(0).milliseconds(0).add(1, 'hours');
const dateNowPlus1 = dateNow.clone().add(1, 'hours');

const initialState = {
    auth: {
        uid: '123',
        name: 'testname'
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'Test title',
            notes: 'Test notes',
            start: dateNow.toDate(),
            end: dateNowPlus1.toDate(),
        },
    },
    ui: {
        isModalOpen: true
    },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
);

describe('Tests on <CalendarModal />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should display modal if isModalOpen is true', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBeTruthy();
    });

    test('Should call the action of update event and close modal', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });
        expect(eventStartUpdating).toHaveBeenCalledWith(initialState.calendar.activeEvent);
    });

    test('Should show an error if title is missing', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });
        const inputTitle = wrapper.find('input[name="title"]');
        expect(eventStartUpdating).not.toHaveBeenCalled();
        expect(inputTitle.hasClass('is-invalid')).toBeTruthy();
    });
});