import { INIT_STATE } from './states';
import {createSelector} from 'reselect'
const selectData = (state) => state.serviceProducers || INIT_STATE;
const selectLoading = createSelector(selectData,(state)=>state.isLoading)
const selectService = createSelector(selectData, (state)=>state.service)

export{
    selectLoading,
    selectService,
}