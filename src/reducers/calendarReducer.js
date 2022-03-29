import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.calendarAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload,
                ],
            };

        case types.calendarSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            };

        case types.calendarClearActive:
            return {
                ...state,
                activeEvent: null
            };

        case types.calendarUpdate:
            return {
                ...state,
                events: state.events.map(event =>
                    action.payload.id === event.id
                        ? action.payload
                        : event
                )
            };

        case types.calendarDelete:
            return {
                ...state,
                events: state.events.filter(event =>
                    state.activeEvent.id !== event.id
                ),
                activeEvent: null,
            };

        default:
            return state;
    };
};