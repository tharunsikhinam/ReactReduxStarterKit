/**
 * Created by quikr on 7/14/16.
 */

import * as types from '../actions/actionTypes';
import initialStore from './initialStore';
export default function authorReducer(state = initialStore.authors,action)
{
  //switch across actions.. type is a must in action
  switch(action.type)
  {

    case types.LOAD_AUTHORS_SUCCESS:
      //debugger;
      return action.authors;


    default: return state;
  }
}
