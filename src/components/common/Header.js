/**
 * Created by quikr on 7/12/16.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({time}) =>
{



    return (<nav><IndexLink to="/" activeClassName="active">Home</IndexLink>
        {" | "}
        <Link to="/courses" activeClassName="active">Courses</Link>
        {" | "}
        <Link to="/about" activeClassName="active">About</Link>
      {time && <LoadingDots  dots={20}/>}



      </nav>
    );

};


export default  Header;

