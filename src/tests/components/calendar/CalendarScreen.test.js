import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { types } from '../../../types/types';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

import { messages } from '../../../helpers/calendar-messages-es';
import { eventSetActive } from '../../../actions/calendarActions';

jest.mock('../../../actions/calendarActions', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn(),
}));
Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        uid: '123',
        name: 'testname'
    },
    calendar: {
        events: [],
    },
    ui: {
        openModal: false
    },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
);


describe('Tests on <CalendarScreen />', () => {
    test('Should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Calendar interactions should work correctly', () => {
        const calendar = wrapper.find('Calendar');

        // messages prop
        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toEqual(messages);

        // onDoubleClickEvent prop
        const onDoubleClickEventAction = { type: types.uiOpenModal };
        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith(onDoubleClickEventAction);

        // onSelectEvent prop
        const onSelectEventParam = { start: 'hello' };
        calendar.prop('onSelectEvent')(onSelectEventParam);
        expect(eventSetActive).toHaveBeenCalledWith(onSelectEventParam);

        // onView prop
        const onViewParam = 'week';
        act(() => {
            calendar.prop('onView')(onViewParam);
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', onViewParam);
        });
    });
});