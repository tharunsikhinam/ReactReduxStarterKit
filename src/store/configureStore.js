/**
 * Created by quikr on 7/13/16.
 */
import {createStore, applyMiddleware,compose} from 'redux';
import rootReducer from '../reducers';
import reduxImutableStateVariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//takes in two parameters to create store, one is initial state.. here you can set some state values that you want
//pre built into the store
//one can add middlewares as well . done using applymiddleware (mw1(), mw2()..)
export default function configureStore(initialState)
{
  return createStore( rootReducer, initialState, compose(applyMiddleware(thunk, reduxImutableStateVariant())));
}
