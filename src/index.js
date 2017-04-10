/**
 * Created by quikr on 7/12/16.
 */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';


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
let apiHost= document.getElementById("apiHost").value;
let userId = document.getElementById("userId").value;
let email = document.getElementById("username").value;


let otpClientId=document.getElementById("otpClientId").value;


//Provider is used to connect the react components to the redux store
ReactDOM.render (<HomePage userId="41"
                           email="abc"
                           apiHost="http://logisti"
                           otpClientId={otpClientId}
                           userType="USER"/>,document.getElementById('appTest')
);

//ReactDOM.render(<HomePage/>,document.getElementById('app'));



