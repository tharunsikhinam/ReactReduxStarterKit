/**
 * Created by quikr on 7/14/16.
 */

import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';
export function loadAuthorsSuccess(authors)
{
  //debugger;
  return {type: types.LOAD_AUTHORS_SUCCESS , authors}
}

export function loadAuthors()
{
  //debugger;
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    });
    };
}

