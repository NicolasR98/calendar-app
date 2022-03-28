import { types } from "../types/types";

export const eventAddNew = (event) => ({
    type: types.calendarAddNew,
    payload: event,
});

export const eventSetActive = (event) => ({
    type: types.calendarSetActive,
    payload: event,
});