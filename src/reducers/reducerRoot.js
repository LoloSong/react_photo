import { combineReducers } from 'redux';
import appReducer  from './appReducer.js';

let reducerRoot = combineReducers({
    appReducer
});

export default reducerRoot;