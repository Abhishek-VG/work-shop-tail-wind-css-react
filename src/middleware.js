import { applyMiddleware } from 'redux';
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const enhancers = [ReduxThunk, ReduxLogger];

export default applyMiddleware(...enhancers);
