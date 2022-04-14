import { uiReducer } from "../../reducers/uiReducer";
import { closeModal, openModal } from "../../actions/uiActions";


const initialState = {
    isModalOpen: false,
};

describe('Tests on uiReducer', () => {
    test('Should return the default state', () => {
        const state = uiReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('Should open and close the modal', () => {
        const expectedOpenState = {
            isModalOpen: true,
        };
        const expectedCloseState = {
            isModalOpen: false
        };
        const actionModalOpen = openModal();
        const acionModalClose = closeModal();

        const stateOpen = uiReducer(initialState, actionModalOpen);
        const stateClose = uiReducer(initialState, acionModalClose);

        expect(stateOpen).toEqual(expectedOpenState);
        expect(stateClose).toEqual(expectedCloseState);
    });
});