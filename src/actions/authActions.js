import { types } from "../types/types";
import { fetchWithoutToken } from "../helpers/fetch";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
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

const login = (user) => ({
    type: types.authLogin,
    payload: user
});