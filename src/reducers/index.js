import {combineReducers} from 'redux';
import courses from './courseReducers';
import authors from './authorReducers';
import ajaxCallsInProgress from './ajaxStatusReducer';
//defining a root reducer.. mandatory.. as more reducers add up .. combine them here
const rootReducer = combineReducers({courses ,  authors , ajaxCallsInProgress});

export default rootReducer;
