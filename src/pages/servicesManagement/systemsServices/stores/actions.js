import {
    SET_LOADING_STEP,
    GET_ALL_SERVICES,
    SAVE_ALL_SERVICES,
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    DELETE_SUCCESS,
    UPDATE_SUCCESS
} from './constants';

export function setLoadingStep(payload) {
    return {
        type: SET_LOADING_STEP,
        payload,
    }

};
export function getALLServices(payload) {
    return {
        type: GET_ALL_SERVICES,
        payload,
    }

};

export function saveALLServices(payload) {
    return {
        type: SAVE_ALL_SERVICES,
        payload,
    }

};

export const asyncCreateServiceRequest = (dispatch)=>(payload)=>
new Promise((resolve)=>
    dispatch({ type: CREATE_SERVICE_REQUEST, payload, resolve})

);

export function createServiceSuccess(payload) {
    return {
        type: CREATE_SERVICE_SUCCESS,
        payload,
    }

};

  export const deleteSuccess = (dispatch)=>(payload)=>
  new Promise((resolve)=>
      dispatch({ type: DELETE_SUCCESS, payload, resolve})
  
  );