/**
 * Created by quikr on 7/12/16.
 */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Router, browserHistory,Route,IndexRoute} from "react-router";
import configureStore from './store/configureStore';
import TransferAmount from './components/CodLedger/TransferAmount';
import Routes from './routes';

import App from './components/App';

import AboutPage from './components/about/AboutPage';
import CoursePage from './components/courses/CoursePage';
import ManageCoursePage from './components/courses/ManageCourse';
import Tictactoe from './components/Tictactoe/Main'
import MapTest from './components/map/MapTest';
import MapHome from './components/map/MapHome';

import HomePage from './components/CodLedger/HomePage';
import GenerateManifest from './components/GenerateManifest/GenerateManifestHome';
//export default GenerateManifest;

import {loadAuthors} from './actions/authorActions';

//generally pass initial state as default parameters in each of the reducers..., pass initial state in configure store
//if server sends some data or fields that need to filled up before app starts off.




 //load a part of the store by dispatching actions.. here loadcourses is an action form courseactions js
//loadcourses does an ajax call and sends the data to an action creator, which goes to a reducer and ......


//debugger;
//console.log(document.getElementById("userId").value);
/*let apiHost= document.getElementById("apiHost").value;
let userId = document.getElementById("userId").value;
let email = document.getElementById("username").value;


let otpClientId=document.getElementById("otpClientId").value;
*/

//Provider is used to connect the react components to the redux store
ReactDOM.render (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={MapHome}>
        <IndexRoute component={MapTest}/>
        <Route path="maps" component={MapHome}/>
      </Route>
    </Router>
    </MuiThemeProvider>,document.getElementById('transferAmount')
);

//ReactDOM.render(<HomePage/>,document.getElementById('app'));



