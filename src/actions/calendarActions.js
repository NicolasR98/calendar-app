import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const auxParams = {
            endpoint: 'events',
            data: event,
            method: 'POST'
        };
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchWithToken(auxParams);
            const body = await resp.json();

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name,
                };
                dispatch(eventAddNew(event));
            };

        } catch (error) {
            console.error(error);
        }

    };
};

const eventAddNew = (event) => ({
    type: types.calendarAddNew,
    payload: event,
});

export const eventSetActive = (event) => ({
    type: types.calendarSetActive,
    payload: event,
});

export const eventUpdate = (event) => ({
    type: types.calendarUpdate,
    payload: event,
});

export const eventDelete = () => ({ type: types.calendarDelete });

export const eventClearActive = () => ({ type: types.calendarClearActive });