/**
 * Created by quikr on 7/12/16.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/CodLedger/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursePage from './components/courses/CoursePage';
import ManageCoursePage from './components/courses/ManageCourse';
import Tictactoe from './components/Tictactoe/Main'
import MapTest from './components/map/MapTest';
import MapHome from './components/map/MapHome';
export default(
  <Route path="/" component={App}>
    <IndexRoute component={MapTest}/>
    <Route path="maps" component={MapHome}/>
    <Route path="courses" component={CoursePage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="tictactoe" component={Tictactoe} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="about" component={AboutPage} />
    <Route path="map" component = {MapTest}/>
  </Route>
);
