import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Layout from './Layout';
import {bindActionCreators} from 'redux';

class Main extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
          <div>
          <h1>React Tutorial</h1>
          <Layout/>
            </div>
        );
    }

}

Main.propTypes = {};

function mapStateToProps(state, ownState) {
    return {
        state: state
    };

}


export default connect(mapStateToProps)(Main);

