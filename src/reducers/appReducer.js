import * as type from '../actions/actionType.js';

let appReducer = (state = [], action) => {
    switch(action.type){
        case type.get_allImages_recevied:
            action.data.forEach(function(val){
                val.imgUrl = `images/${val.fileName}`
            })
            return action.data;
        default:
            return state;
    }
}

export default appReducer;
