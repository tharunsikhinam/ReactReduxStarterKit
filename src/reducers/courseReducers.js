
import * as types from '../actions/actionTypes';
import initialState from './initialStore';
export default function courseReducer(state = initialState.courses,action)
{
  //switch across actions.. type is a must in action
  switch(action.type)
  {

    case  types.LOAD_COURSES_SUCCESS:
      debugger;
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
          //debugger;
          return[...state, Object.assign({},action.course)];

    case types.UPDATE_COURSE_SUCESS:

      return [...state.filter(course => course.id!== action.course.id ),Object.assign({},action.course)];
      //debugger;

        /*var newState = [...state];

        //return [...state , {title: x} ] ;

        return [...newState, Object.assign({},action.course)];*/

    default: return state;
  }
}
