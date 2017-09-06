import * as type from './actionType.js';
import imageDatas from '../data/data.json';

export let get_allImages = () => {
    return async dispatch => {
        try{
            let data = imageDatas;
            dispatch({type: type.get_allImages_recevied, data});
        }catch(error){
            console.log(error);
        }
    }
}