import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {loadCourses} from '../../actions/courseActions';
import TextInput from '../common/TextInput';
import toastr from 'toastr';
class ManageCourse extends React.Component {

  constructor(props,context) {
    super();
    debugger;
    this.state = { course: Object.assign({}, props.course), errors: {},saving: false};
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse =  this.saveCourse.bind(this);

  }

  updateCourseState(event)
  {
    const field =event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event)
  {

    event.preventDefault();
    this.props.loadcourses();
    this.setState({saving: true});
    debugger;
    //this.props.actions.
    this.props.saveCoursess(this.state.course).then(()=>{this.redirect();});
  }
  redirect()
  {
    this.setState({saving: false});
    toastr.success('Course Saved');
    this.context.router.push('/courses');

  }

  componentWillReceiveProps(props)
  {
    //debugger;
    this.setState ({course: Object.assign({},props.course)});
  }
  render() {
    //debugger;
    return (<div>

        <CourseForm
          onChange = {this.updateCourseState}
          allAuthors={this.props.authors}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
          loading={this.state.saving}/>
      </div>
    );
  }

}

ManageCourse.propTypes = {

  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,



};
ManageCourse.contextTypes={
  router: PropTypes.object.isRequired
};

function getCourseById(courses,id)
{
  const course = courses.filter(course=> course.id == id);
  if(course) return course[0];
  return null;
}

function mapStateToProps(state, ownState) {
  debugger;
  const courseid=ownState.params.id;
  let course = {id:'', watchHref:'',title: '', authorId: '', length: '', category: ''};

  if(courseid && state.courses.length > 0)
  {
    course = getCourseById(state.courses,courseid);
  }
  debugger;
  let authorsFormatted=  state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });


  return {
    course:  course,
    authors: authorsFormatted

  };

}

function mapDispatchToProps(dispatch) {
  return {
    saveCoursess: course => dispatch(courseActions.saveCourses(course)),
    loadcourses: course => dispatch(courseActions.loadCourses())
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);

