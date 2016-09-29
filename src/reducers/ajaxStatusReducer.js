/**
 * Created by quikr on 7/27/16.
 */
import * as types from '../actions/actionTypes';
import initialState from './initialStore';

function actionTypeEndsInSuccess(type)
{
  return type.substring(type.length - 8) == '_SUCCESS';
}


export default function ajaxStatusReducer (state = initialState.numAjaxCallsInProgress,action)
{
  if(action.type === types.BEGIN_AJAX_CALL)
    return state+1;
  else if(actionTypeEndsInSuccess(action.type)){
    return state-1;
  }

  return state;
}
