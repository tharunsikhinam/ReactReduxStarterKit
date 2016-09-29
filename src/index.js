/**
 * Created by quikr on 7/12/16.
 */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory,hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
//import HomePage from './components/home/HomePage';
//import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/toastr/build/toastr.min.css';

//generally pass initial state as default parameters in each of the reducers..., pass initial state in configure store
//if server sends some data or fields that need to filled up before app starts off.



const store = configureStore();
 //load a part of the store by dispatching actions.. here loadcourses is an action form courseactions js
//loadcourses does an ajax call and sends the data to an action creator, which goes to a reducer and ......


//debugger;
store.dispatch(loadAuthors());



//Provider is used to connect the react components to the redux store
ReactDOM.render (<Provider store={store} >
      <Router history={hashHistory} routes={routes} />
  </Provider>,document.getElementById('app')
);
//ReactDOM.render(<HomePage/>,document.getElementById('app'));


