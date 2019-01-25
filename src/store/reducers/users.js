import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    albumList: [],
};

const updateUserList = (state, action) => {
    return updateObject(state, { albumList: action.albumList })
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALBUM: return updateUserList(state, action);
        default:
            return state;
    }
};

export default reducer;