import React, {PropTypes} from 'react';
import Sidebar from './Sidebar';

class MapHome extends React.Component {


    constructor() {
      super();
    }

    render() {
        return (
          <div>
          <div style={{padding: 0,margin: 0}} className="col-md-2">
            <Sidebar />
            </div>
            <div style={{padding: 0,margin: 0}} className="col-md-3">
            <Sidebar />
            </div>
          </div>
        );
    }
}

MapHome.propTypes = {};

export default MapHome;


