import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducerRoot from '../reducers/reducerRoot';

let store = createStore(
    reducerRoot,
    applyMiddleware(thunk)
);

export default store;