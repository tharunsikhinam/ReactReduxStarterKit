/**
 * Created by quikr on 3/28/17.
 */

import React, {PropTypes} from 'react';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import CalculateWeight from './CalculateWeight';



class OrdersTable extends React.Component{
  constructor()
  {
    super();
    this.onSave  = this.onSave.bind(this);
    this.state={disabled: {},active: {}}
  }
  onSave(orderId){

    let disabled = this.state.disabled;
    disabled[orderId]=false;
    this.setState({disabled: disabled});


  }
  componentDidMount()
  {
    let disabled={};let active={}
    this.props.orders.map((order)=>{
      active[order.orderId]=false;
      disabled[order.orderId]=true;
    });
    this.setState({disabled: disabled,active: active});
  }

  componentWillReceiveProps(props)
  {
    let disabled={};let active={};
    if(props.orders.length>0) {
      props.orders.map((order)=> {
        active[order.orderId] = false;
        disabled[order.orderId] = order.productVWeight != 0 ? false : true;
      });
      this.setState({disabled: disabled, active: active});
    }
  }
  renderShowsTotal(start, to, total) {
    return (
      <p style={ {color: 'black',display: 'inline',marginRight: '10px'} }>
        From { start } to { to }, total entries { total }
      </p>
    );
  }


  render()
  {
    const options = {
       paginationShowsTotal: this.renderShowsTotal,
      paginationPosition: 'top'// Enable showing total text
    };


    return (

      <div style={{marginTop: '0px'}}>

        <div className="admin-container" style={{marginTop: '0px'}}>
          <div className="filter-container">
            <button style={{marginTop: '2px'}} id="search"
                    onClick={()=>{
                      let orderIds = [];
                      Object.keys(this.state.active).map((key)=>{
                        if(this.state.active[key]==true)
                          orderIds.push(key);
                      });
                      if(orderIds.length<=0) {
                        toastr.info("Select orders");
                        return;
                      }
                      axios.post("/tms/v1/externalVendor/createBooking",{orderIds: orderIds},{withCredentials: true,headers: {'X-Quikr-Client': 'app'}}).then((response)=>{
                        let responseString="";
                        orderIds.map((orderId)=>{
                          responseString+=orderId+", ";
                        });
                        toastr.success("Booking created successfully Order No: "+responseString);
                        //this.props.onSave(this.props.orderId);

                      }).catch((error)=>{
                        toastr.error("Error Occurred. Try Again")

                      });
                    }}
                    className="admin-btn-blue">Create Booking</button>
          </div>
        </div>

        <div className="table-container">
          <div className="selectAllRecords">
            <div id="selectAllWrapper"></div>
            <div id="clearAllWrapper"></div>
          </div>
          <div className="selectAllRecords">

          </div>
          <div className="table-container" style={{fontFamily:'Gotham,Helvetica'}}>
            <BootstrapTable
              tableHeaderClass="grey"
              containerStyle={{width: '100%'}}
              data={this.props.orders}
              trClassName="lighterGrey"
            pagination
            options={options}>
              <TableHeaderColumn width={'5%'} dataFormat={(cell,order)=>{
                  return <input ref={(ref)=> this[order.orderId]=ref}
                                disabled={this.state.disabled[order.orderId]}
                                checked={this.state.active[order.orderId]}
                                onChange={()=>{
                                  let active = this.state.active;
                                  active[order.orderId]=!this.state.active[order.orderId];
                                  //   this.props.changeActive(active);
                                  this.setState({active: active});

                                }}
                                type="checkbox"  className="selectThis"/>
                }}
                dataField="orderId">&nbsp;</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField="orderId" isKey={true}>Order Id</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField="destinationCityName" hidden={true} export={true}>Order Id</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField="title" >Title</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField="destinationCityName" >Destination</TableHeaderColumn>
              <TableHeaderColumn width={'50%'} dataField="destinationCityName"
                                 dataFormat={(cell,order)=>{
                                   return <CalculateWeight
                                     length={order.productLength}
                                     breadth={order.productWidth}
                                     height={order.productHeight}
                                     actualWeight={order.productWeight}
                                     deadWeight = {order.productVWeight}
                                     onSave={this.onSave}
                                     orderId={order.orderId}/>
                                 }}
                                 >Calculate Weight</TableHeaderColumn>
            </BootstrapTable>
            <div style={{display: 'none'}}>
            <table width="100%" border="0" className="table table-bordered" cellspacing="0" cellpadding="0">
              <thead id="createdSlotsTbHead">

              {this.props.orders.length>0?
                <tr className="grey">

                  <th className="minWidth" width={"2%"}>
                    &nbsp;
                  </th>
                  <th width={"16%"} >
                    Order Id
                  </th>
                  <th width={"16%"}>
                    Product Title
                  </th>
                  <th width={"16%"}>
                    Destination
                  </th >
                  <th width={"50%"}>Capture Weight
                  </th>
                </tr>:<tr><th style={{textAlign: 'center',color: "#c6c6c6",width: '100%'}}>No data to display</th></tr>}
              </thead>
              <tbody id="searchResults">
              {this.props.orders.map((order,index)=>{

              let color =null;
                if (index %2 ==0 )
                  color = 'white';
                else
                  color = 'lightGrey';

                return <tr

                  key={order.orderId}>
                  <td className="minWidth" width={'1%'}>
                    <input ref={(ref)=> this[order.orderId]=ref}
                           disabled={this.state.disabled[order.orderId]}
                           checked={this.state.active[order.orderId]}
                           onChange={()=>{
                             let active = this.state.active;
                             active[order.orderId]=!this.state.active[order.orderId];
                             //   this.props.changeActive(active);
                             this.setState({active: active});

                           }}
                           type="checkbox"  className="selectThis"/></td>
                  <td>{order.orderId}</td>
                  <td>{order.title}</td>
                  <td>{order.destinationCityName}</td>
                  <td >
                    <CalculateWeight
                      length={order.productLength}
                      breadth={order.productWidth}
                      height={order.productHeight}
                      actualWeight={order.productWeight}
                      deadWeight = {order.productVWeight}
                      onSave={this.onSave}
                      orderId={order.orderId}/>
                  </td></tr>
              })}
              </tbody>
            </table>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrdersTable;
