import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [
        {
            title: 'Birthday',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            user: {
                _id: '123',
                name: 'Nicolas',
            }
        },
    ],
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

        default:
            return state;
    }
};