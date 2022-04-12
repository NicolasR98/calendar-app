import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";

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

export const eventStartLoading = () => {
    return async (dispatch) => {
        const auxParams = {
            endpoint: 'events',
        };

        try {
            const resp = await fetchWithToken(auxParams);
            const body = await resp.json();

            if (body.ok) {
                const preparedEvents = prepareEvents(body.events);
                dispatch(eventsLoad(preparedEvents));
            }
        } catch (error) {
            console.error(error);
        }
    };
};

export const eventStartUpdating = (event) => {
    return async (dispatch) => {
        try {
            const auxParams = {
                endpoint: `events/${event.id}`,
                data: event,
                method: 'PUT',
            };
            const resp = await fetchWithToken(auxParams);
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventUpdate(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.error(error);
        }
    };
};

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        const { id } = getState().calendar.activeEvent;
        const auxParams = {
            endpoint: `events/${id}`,
            method: 'DELETE',
        };

        try {
            const resp = await fetchWithToken(auxParams);
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventDelete());
            } else {
                Swal.fire('Error', body.msg, 'error');
            };
        } catch (error) {
            console.error(error);
        }
    };
};

const eventsLoad = (events) => ({
    type: types.calendarLoad,
    payload: events,
});

const eventAddNew = (event) => ({
    type: types.calendarAddNew,
    payload: event,
});

export const eventSetActive = (event) => ({
    type: types.calendarSetActive,
    payload: event,
});

const eventUpdate = (event) => ({
    type: types.calendarUpdate,
    payload: event,
});

const eventDelete = () => ({ type: types.calendarDelete });

export const eventClearActive = () => ({ type: types.calendarClearActive });

export const eventClearAll = () => ({ type: types.calendarClearAll });