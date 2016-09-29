/**
 * Created by quikr on 7/12/16.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions'
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {browserHistory,hashHistory} from 'react-router';

class CoursePage extends React.Component{

  //constructor
  constructor(props, context)
  {
    super();
    this.state = { course : { title: ""}};
    this.state = {flag : 0};
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);

  }

  //functions relevant, called by render

  courseRow(course, index)
  {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage()
  {
    hashHistory.push('/course');
  }
  componentDidMount()
  {
    this.props.actions.loadCourses();
  }




  //render function . container usually calls a child component , do not put lots of markup here
  render()
  {

    //Destructure the recieved props into parts needed and load them into child components
    const {courses} = this.props;
    //document.cookie = "username: hey";


    return (<div>
            <h1>Courses</h1>

            <input type="submit"
                   value = "Add course"
                   className="btn btn-primary"
                   onClick={this.redirectToAddCoursePage} />
            <CourseList courses={courses}/>

    </div>);
  }
}
//define proprtypes
CoursePage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  createCourse: PropTypes.func.isRequired


}

//react redux relevant code.. which state does the container want to be props, and which actions need to be dispatched
// to the store
function mapStateToProps(state,ownProps)
{

debugger;
  return { courses: state.courses };
}

function mapDispatchToProps(dispatch)
{
  //Three ways to dispatch actions to the store
  // 1. remove mapDispatchtoprops and call it directly in the component using this.props.dispatch(<actionsfilename>.<nameof action>(params))
  // 2. put mdtp func and map an action to dispatch(<>.<>(params)
  // 3. use bind action creators
  return {
    actions: bindActionCreators(courseActions,dispatch)
    //createCourse: (course) => dispatch(courseActions.createCourse(course))
};
}
export default connect(mapStateToProps,mapDispatchToProps)(CoursePage);
