import * as actionTypes from './actionTypes';
import { updateObject } from '../utility';
import axios from '../../axios-instance';

export const getAlbums = () => {
    return dispatch => {
        axios.get("/albums")
            .then(response => {
                dispatch(getAlbumList(response.data));
            })
            .catch(err => {
                console.log(err);
            });
    };
}


export const getAlbumList = (albumList) => {
    return {
        type: actionTypes.GET_ALBUM,
        albumList: albumList
    };
}

