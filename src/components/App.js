/**
 * Created by quikr on 7/12/16.
 */
import React, {PropTypes} from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';



class App extends React.Component {

  constructor() {
    super();

  }

  render() {
    return (<div className="container-fluid"><Header time={this.props.val} />
      {this.props.children}</div>);
  }

  componentWillReceiveProps(props) {
  }
}

App.propTypes={
  children: PropTypes.object.isRequired
};
App.defaultProps = {
  val: 0
}
function mapStateToProps(state,ownProps)
{
  return {val: state.ajaxCallsInProgress > 0}
}
export default  connect(mapStateToProps)(App);
