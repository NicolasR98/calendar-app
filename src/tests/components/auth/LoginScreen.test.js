import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/authActions';


jest.mock('../../../actions/authActions', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
);


describe('Tests on <LoginScreen />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Should call the dispatch of the login action', () => {
        const emailEvent = {
            target: {
                name: 'loginEmail',
                value: 'test@test.com',
            },
        };
        const passwordEvent = {
            target: {
                name: 'loginPassword',
                value: '123456'
            },
        };
        const expectedArgs = {
            email: emailEvent.target.value,
            password: passwordEvent.target.value,
        };

        // Simulate user credential input
        wrapper.find('input[name="loginEmail"]').simulate('change', emailEvent);
        wrapper.find('input[name="loginPassword"]').simulate('change', passwordEvent);
        const loginForm = wrapper.find('form').at(0);

        loginForm.prop('onSubmit')({
            preventDefault() { }
        });

        expect(startLogin).toHaveBeenCalledWith(expectedArgs);
    });

    test('Should not do a register if the password do not match', () => {
        const nameEvent = {
            target: {
                name: 'registerName',
                value: 'testname',
            },
        };
        const emailEvent = {
            target: {
                name: 'registerEmail',
                value: 'test@test.com',
            },
        };
        const passwordEvent = {
            target: {
                name: 'registerPassword',
                value: '123456'
            },
        };
        const passwordRepeatEvent = {
            target: {
                name: 'registerPasswordRepeat',
                value: 'another_password'
            },
        };

        const expectedSwalError = ['Error', 'The passwords must be the same', 'error'];

        // Simulate user credential input
        wrapper.find('input[name="registerName"]').simulate('change', nameEvent);
        wrapper.find('input[name="registerEmail"]').simulate('change', emailEvent);
        wrapper.find('input[name="registerPassword"]').simulate('change', passwordEvent);
        wrapper.find('input[name="registerPasswordRepeat"]').simulate('change', passwordRepeatEvent);
        const registerForm = wrapper.find('form').at(1);

        registerForm.prop('onSubmit')({
            preventDefault() { }
        });

        expect(Swal.fire).toHaveBeenCalledWith(...expectedSwalError);
        expect(startRegister).not.toHaveBeenCalled();
    });
    test('Should do a register if passwords matches', () => {
        const nameEvent = {
            target: {
                name: 'registerName',
                value: 'testname',
            },
        };
        const emailEvent = {
            target: {
                name: 'registerEmail',
                value: 'test@test.com',
            },
        };
        const passwordEvent = {
            target: {
                name: 'registerPassword',
                value: '123456'
            },
        };
        const passwordRepeatEvent = {
            target: {
                name: 'registerPasswordRepeat',
                value: '123456'
            },
        };

        // Simulate user credential input
        wrapper.find('input[name="registerName"]').simulate('change', nameEvent);
        wrapper.find('input[name="registerEmail"]').simulate('change', emailEvent);
        wrapper.find('input[name="registerPassword"]').simulate('change', passwordEvent);
        wrapper.find('input[name="registerPasswordRepeat"]').simulate('change', passwordRepeatEvent);
        const registerForm = wrapper.find('form').at(1);

        registerForm.prop('onSubmit')({
            preventDefault() { }
        });

        expect(Swal.fire).not.toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalled();
    });
});