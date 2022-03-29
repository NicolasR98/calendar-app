import { types } from "../types/types";

export const eventAddNew = (event) => ({
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