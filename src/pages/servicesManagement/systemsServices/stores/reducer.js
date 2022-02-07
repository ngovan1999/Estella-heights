import { INIT_STATE } from './states';
import produce from 'immer';
import {
    SET_LOADING_STEP,
    SAVE_ALL_SERVICES,
    
} from './constants';

export default function serviceProducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_LOADING_STEP:
                draft.isLoadding = action.payload
                break
            case SAVE_ALL_SERVICES:
                draft.service = action.payload
                break  
            default:
                return state;
        }
    });
}