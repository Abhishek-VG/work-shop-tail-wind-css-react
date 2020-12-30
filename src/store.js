import { createStore } from 'redux';
import reducer from './reducer';
import middleware from './middleware';

// store object of the app
const store = createStore(reducer, middleware);

export default store;