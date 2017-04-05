/**
 * Created by quikr on 3/28/17.
 */


import React, {PropTypes} from 'react';
import axios from 'axios';



class Search extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={hub: null,vendor: null};
    this.props={hubs: props.hubs,vendors: props.vendors};

  }
  render(){

    return (
      <div className="admin-container">
        <div  style={{width: '95%'}} className="filter-container tasks-detail-wrapp">
          <div className="task-art-img"><img src="logistics/images/admintaske-img.jpg" alt=""/></div>
          <div className="filter-list">
            <h2 className="title">Generate Manifest</h2>

            <div className="select-category" >
              <h3 className="lable-txt">Hub</h3>

              <select className="select-dorpdown"
                      id="hubDD"
                      onChange={(event)=>{
                        this.setState({hub: event.target.value});

                      }}    >
                <option value='' selected='selected' disabled>Select Hub</option>
                {this.props.hubs.map((hub)=>{
                  return <option value={hub.id} >{hub.name}</option>;
                })}
              </select>
            </div>

            <div className="select-category" >
              <h3 className="lable-txt">Vendor</h3>
              <select onChange={(event)=>{
                this.setState({vendor: event.target.value})

              }} className="select-dorpdown" id="hubDD">
                <option value='' selected='selected' disabled={true}>Select Vendor</option>
                {this.props.vendors.map((vendor)=>{
                  return <option value={vendor.id}>{vendor.name}</option>
                })}
              </select>
            </div>
            <div className="select-category" >
              <button id="search"
                      className="admin-btn-blue"
                      onClick={()=>{
                        if(this.state.hub==null) {
                          toastr.info("Select Hub");
                          return;
                        }
                        else if(this.state.vendor==null)
                        {
                          toastr.info("Select Vendor");
                          return;
                        }
                        else {
                          this.props.getOrders(this.state.hub,this.state.vendor,0,10);
                        }
                      }}
              >Load Orders</button>
              <button id="search"
                      style={{marginLeft: '20px'}}
                      className="admin-btn-blue"
                      onClick={()=>{
                        if(this.state.hub==null)
                        {toastr.info("Select Hub");
                          return;}
                        else if(this.state.vendor==null)
                        {toastr.info("Select vendor");
                          return;}
                        else {
                        this.props.getManifest(this.state.hub,this.state.vendor,0,10);}
                      }}
              >Load Manifest</button>
            </div>
          </div>
        </div>


      </div>
    );
  }
};


export default Search;
