import { types } from "../../types/types";
import { authReducer } from "../../reducers/authReducer";

const initialState = {
    checking: false,
};

describe('Tests on authReducer', () => {
    test('Should return the default state', () => {
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('should login', () => {
        const actionLogin = {
            type: types.authLogin,
            payload: {
                uid: '123ABC123',
                name: 'testname'
            },
        };
        const expectedState = {
            checking: false,
            uid: actionLogin.payload.uid,
            name: actionLogin.payload.name
        };
        const state = authReducer(initialState, actionLogin);

        expect(state).toEqual(expectedState);
    });

    test('should stop checking auth', () => {
        const currentState = {
            checking: true,
        };
        const action = {
            type: types.authCheckFinish,
        };
        const expectedState = {
            checking: false,
        };
        const state = authReducer(currentState, action);

        expect(state).toEqual(expectedState);
    });

    test('should logout', () => {
        const currentState = {
            checking: false,
            uid: '123ABC123',
            name: 'testname'
        };
        const expectedState = {
            checking: false,
        };
        const action = {
            type: types.authLogout
        };
        const state = authReducer(currentState, action);

        expect(state).toEqual(expectedState);
    });
});