import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import Swal from "sweetalert2";

export const startLogin = ({ email, password }) => {
    const auxParams = {
        endpoint: 'auth',
        data: { email, password },
        method: 'POST'
    };

    return async (dispatch) => {
        const resp = await fetchWithoutToken(auxParams);
        const body = await resp.json();

        if (body.ok) {
            const user = {
                uid: body.uid,
                name: body.name,
            };

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(user));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    };
};

export const startRegister = ({ email, password, name }) => {
    const auxParams = {
        endpoint: 'auth/new',
        data: { email, password, name },
        method: 'POST',
    };

    return async (dispatch) => {
        const resp = await fetchWithoutToken(auxParams);
        const body = await resp.json();

        if (body.ok) {
            const user = {
                uid: body.uid,
                name: body.name
            };

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(user));
        } else {
            Swal.fire('Error', body.msg, 'error');
        };
    };
};

export const startChecking = () => {
    const auxParams = {
        endpoint: 'auth/renew'
    };

    return async (dispatch) => {
        const resp = await fetchWithToken(auxParams);
        const body = await resp.json();

        if (body.ok) {
            const user = {
                uid: body.uid,
                name: body.name
            };

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(user));
        } else {
            Swal.fire('Error', body.msg, 'error');
            dispatch(checkCheckingFinish());
        };
    };
};

const checkCheckingFinish = () => ({ type: types.authCheckFinish });

const login = (user) => ({
    type: types.authLogin,
    payload: user
});