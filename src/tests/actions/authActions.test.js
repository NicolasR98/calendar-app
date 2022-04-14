import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import Swal from 'sweetalert2';

import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';
import { startChecking, startLogin, startRegister } from '../../actions/authActions';


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Tests on authActions', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    test('startLogin => should work correctly when login', async () => {
        const auxParams = {
            email: 'email@example.com',
            password: '123456',
        };

        const expectedAction = {
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            }
        };

        await store.dispatch(startLogin(auxParams));
        const [loginAction] = store.getActions();

        expect(loginAction).toEqual(expectedAction);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        //* Get token from localStorage mock
        // token = localStorage.setItem.mock.calls[0][1]
    });

    test('startLogin => should work correctly when user password is incorrect', async () => {
        const auxParams = {
            email: 'email@example.com',
            password: '12345678',
        };

        const expectedAction = [];
        const expectedError = ['Error', 'Incorrect email or password', 'error'];

        await store.dispatch(startLogin(auxParams));
        const actions = store.getActions();

        expect(actions).toEqual(expectedAction);
        expect(Swal.fire).toHaveBeenCalledWith(...expectedError);
    });

    test('startLogin => should work correctly when user email is incorrect', async () => {
        const auxParams = {
            email: 'email@fake.com',
            password: '12345678',
        };

        const expectedAction = [];
        const expectedError = ['Error', 'Incorrect email or password', 'error'];

        await store.dispatch(startLogin(auxParams));
        const actions = store.getActions();

        expect(actions).toEqual(expectedAction);
        expect(Swal.fire).toHaveBeenCalledWith(...expectedError);
    });

    test('startRegister => should work correctly', async () => {
        const mockResponse = {
            ok: true,
            uid: '123',
            name: 'testname',
            token: '123ABC123'
        };
        const auxParams = {
            email: 'test@test.com',
            password: '123456',
            name: 'testname',
        };
        const expectedAction = {
            type: types.authLogin,
            payload: {
                uid: mockResponse.uid,
                name: mockResponse.name,
            }
        };

        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return mockResponse;
            }
        }));

        await store.dispatch(startRegister(auxParams));
        const [actionLogin] = store.getActions();

        expect(actionLogin).toEqual(expectedAction);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', mockResponse.token);
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startChecking => should work correctly', async () => {
        const mockResponse = {
            ok: true,
            uid: '123',
            name: 'testname',
            token: '123ABC123'
        };
        const expectedAction = {
            type: types.authLogin,
            payload: {
                uid: mockResponse.uid,
                name: mockResponse.name,
            }
        };

        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return mockResponse;
            },
        }));

        await store.dispatch(startChecking());
        const [actionLogin] = store.getActions();

        expect(actionLogin).toEqual(expectedAction);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', mockResponse.token);
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });
});