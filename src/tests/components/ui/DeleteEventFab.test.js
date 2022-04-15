import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/calendarActions';

jest.mock('../../../actions/calendarActions', () => ({
    eventStartDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab />
    </Provider>
);

describe('Tests on <DeleteEventFab />', () => {
    test('Should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Should invoke eventStartDelete when onClick', () => {
        wrapper.find('.fab--delete').prop('onClick')();
        expect(eventStartDelete).toHaveBeenCalledTimes(1);
    });
});