import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../routers/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Tests on <AppRouter />', () => {
    test('Should display correctly', () => {
        const initialState = {
            auth: {
                checking: true,
            }
        };
        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
    test('Should public route if user is not logged', () => {
        const initialState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBeTruthy();
    });

    test('Should private route if user is logged in', () => {
        const initialState = {
            auth: {
                checking: false,
                uid: 'ABC123ABC',
                name: 'testname'
            },
            calendar: {
                events: [],
                activeEvent: null
            },
            ui: {
                isModalOpen: false,
            },
        };
        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper.find('.calendar-screen').exists()).toBeTruthy();
        expect(wrapper.find('.navbar-brand').text().trim()).toBe(initialState.auth.name);
    });
});