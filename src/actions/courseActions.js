/**
 * Created by quikr on 7/13/16.
 */
import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall} from './ajaxStatusActions';

//Creating an action.. it must have a type and some JSON serializable data.
//action creators take in necessary parameters and return the JSON as shown below with a type and data to be sent.

export function loadCoursesSuccess(courses)
{

  return {type: types.LOAD_COURSES_SUCCESS , courses };
}

export function createCourseSuccess(course)
{
  return {type: types.CREATE_COURSE_SUCCESS , course};
}

export function updateCourseSuccess(course)
{
  return {type: types.UPDATE_COURSE_SUCCESS , course};
}

//thunk functions
export function saveCourses(course)
{

  //getState to access the store and do any computations based on that..
  return function(dispatch,getState) {
    dispatch(beginAjaxCall());
    console.log("i got big cojones");
    console.log(getState().authors);

    return courseApi.saveCourse(course).then(course => {
      //debugger;

      course.id ? dispatch (updateCourseSuccess(course)) :
      dispatch(createCourseSuccess(course));
    });
  };
}
export function loadCourses()
{

  return function(dispatch){
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}
//thunk part of the code
//thunk boilerplate
/*

 export function <nameoffunction>()
 {
 return function(dispatch)
 {
 make a call to action creator with the data received from AJAX calls......,
 use promise client.
 let the ajax call return a promise..
 write functions to handle success case - generally call an action creator


 }

 }


 */
