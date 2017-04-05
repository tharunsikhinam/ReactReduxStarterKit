import React, {PropTypes} from 'react';
import axios from 'axios';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import CreateManifestHomes from './CreateManifestHome';
import Button from 'react-bootstrap/lib/Button';




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
                        console.log(event.target.value);
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

                        this.props.getOrders(this.state.hub,this.state.vendor,0,10);
                      }}
              >Load Orders</button>
              <button id="search"
                      style={{marginLeft: '20px'}}
                      className="admin-btn-blue"
                      onClick={()=>{
                        if(this.state.hub==null)
                          toastr.info("Select Hub");
                        if(this.state.vendor==null)
                          toastr.info("Select vendor");
                        this.props.getManifest(this.state.hub,this.state.vendor,0,10);
                      }}
              >Load Manifest</button>
            </div>
          </div>
        </div>


      </div>
    );
  }
};


class CalculateWeight extends React.Component{
  constructor()
  {
    super();
    this.state={height: "",length: "",breadth: "", actualWeight: "",deadWeight: "",edit: true,save: false};

    this.calculateActualWeight  = this.calculateActualWeight.bind(this)
    this.updateProductDimensionInfo = this.updateProductDimensionInfo.bind(this);
  }
  updateProductDimensionInfo()
  {
    this.calculateActualWeight().then(()=>{
      axios.post("/tms/v1/updateProductDimensionInfo",{orderId: this.props.orderId,
        length: parseInt(this.state.length),
        width: parseInt(this.state.breadth),
        height: parseInt(this.state.height),
        weight: parseFloat(this.state.actualWeight),
        vweight: parseFloat(this.state.deadWeight),
        updatedBy: "dbadb"},{withCredentials: true,headers: {'X-Quikr-Client': 'app'}}).then((response)=>{
        this.setState({edit: true,save: false})
        this.props.onSave(this.props.orderId);
        toastr.success("Product Dimensions Updated");
        console.log(response);
      }).catch((error)=>{
        console.log(error);
      });


    });

    //this.setState({edit: true});
    this.props.onSave(this.props.orderId);

  }
  calculateActualWeight()
  {
    return new Promise((resolve,reject)=> {
      let length = parseInt(this.state.length);

      let breadth = parseInt(this.state.breadth);
      let height = parseInt(this.state.height);
      let actualWeight = ((length * breadth * height ) / 1728) * 7;
      this.setState({actualWeight: actualWeight + "kg"});
      resolve(true);
    });

  }
  render()
  {
    let disableActualWeight = true;
    if(this.state.length!="" && this.state.breadth!="" && this.state.height!="" && !this.state.edit)
      disableActualWeight= false;
    else disableActualWeight = true;
    let disableSave = true;
    if(this.state.length!="" && this.state.breadth!="" && this.state.height!="" && this.state.actualWeight!="" && this.state.deadWeight!="" && this.state.save)
      disableSave=false;
    else
      disableSave=true;
    let inputClass="input-box";
    if(this.state.edit == false)
      inputClass="input-box";
    else
      inputClass="input-box disabled";
    return (
      <div style={{paddingLeft: 0}} className="col-md-12">
        <div style={{width: '25%'}}   className="col-sm-3">
          Length<br/>
          <input style={{width: "100%"}}
                 disabled={this.state.edit}
                 value={this.state.length}
                 onFocus={(event)=>{
                   if(event.target.value!=null)
                     this.setState({length: parseInt(event.target.value)?parseInt(event.target.value):null});
                 }}
                 onChange={(event)=>{
                   if(event.target.value!=null)
                     this.setState({length: parseInt(event.target.value)?parseInt(event.target.value):null});
                 }}
                 onBlur={(event)=>{
                   console.log(parseInt(event.target.value));
                   if(event.target.value!=null)
                     this.setState({length: parseInt(event.target.value)?parseInt(event.target.value)+"cm":""});
                 }}
                 type="text" className={inputClass} id="adNo" placeholder="Length(cm)" />
        </div>

        <div className="col-sm-3" style={{paddingLeft: 0,width: '25%'}}>
          Breadth<br/>
          <input
            disabled={this.state.edit}
            onFocus={(event)=>{
              if(event.target.value!=null)
                this.setState({breadth: parseInt(event.target.value)?parseInt(event.target.value):null});
            }}
            onChange={(event)=>{
              if(event.target.value!=null)
                this.setState({breadth: parseInt(event.target.value)?parseInt(event.target.value):null});
            }}
            onBlur={(event)=>{
              if(event.target.value!=null)
                this.setState({breadth: parseInt(event.target.value)?parseInt(event.target.value)+"cm":""});
            }}
            value={this.state.breadth}
            style={{width: "100%"}}
            type="text" className={inputClass} id="adNo" placeholder="Breadth(cm)" />
        </div>
        <div className="col-sm-3" style={{width: '24%',paddingLeft: 0,paddingRight: '5px'}}>
          Height <br/>
          <input
            disabled={this.state.edit}
            type="text"
            onFocus={(event)=>{
              if(event.target.value!=null)
                this.setState({height: parseInt(event.target.value)?parseInt(event.target.value):null});
            }}
            onChange={(event)=>{
              if(event.target.value!=null)
                this.setState({height: parseInt(event.target.value)?parseInt(event.target.value):null});
            }}
            onBlur={(event)=>{
              if(event.target.value!=null)
                this.setState({height: parseInt(event.target.value)?parseInt(event.target.value)+"cm":""});
            }}
            value={this.state.height}
            style={{width: "100%"}}
            className={inputClass} id="adNo" placeholder="Height(cm)" />
        </div>


        <div className="col-sm-1" style={{paddingLeft: 0,paddingRight: '5px',width: '12.5%'}}>
          <br/>
          <Button style={{width: '100%',padding: '4%',marginTop: '1%'}} id="search"

                  onClick={()=>{
                    this.setState({edit: false,save: true});
                  }}
                  bsStyle="primary">Edit</Button>

        </div>
        <div className="col-sm-1" style={{paddingLeft: 0,paddingRight: 0,width: '12.5%'}}>
          <br/>
          <Button style={{width: '100%',padding: '4%'}} id="search"
                  disabled={disableSave}
                  onClick={this.updateProductDimensionInfo}
                  bsStyle="primary">Save</Button>

        </div>
        <br/>
        <div className="col-sm-12">

          <input disabled={true} type="text" className={inputClass} id="adNo" placeholder="Actual Weight" value={this.state.actualWeight}/>
          <Button style={{width: '40%',paddingTop: '0.5%',backgroundColor: 'light-grey'}} id="search"
                  disabled={disableActualWeight}
                  bsStyle="primary"
                  onClick={()=>{
                    let length=parseInt(this.state.length);
                    let breadth = parseInt(this.state.breadth);
                    let height = parseInt(this.state.height);
                    let actualWeight = (length * breadth * height )/1728*7;
                    this.setState({actualWeight: actualWeight+"kg"});
                  }}
                  className="admin-btn-blue">Calculate Actual Weight</Button>
        </div>
        <br/>
        <div className="col-sm-12">

          <input type="text" className={inputClass} id="adNo"
                 disabled={this.state.edit}
                 value={this.state.deadWeight}
                 onFocus={(event)=>{
                   if(event.target.value!=null)
                     this.setState({deadWeight: parseInt(event.target.value)?parseInt(event.target.value):null});
                 }}
                 onChange={(event)=>{
                   if(event.target.value!=null)
                     this.setState({deadWeight: parseInt(event.target.value)?parseInt(event.target.value):null});
                 }}
                 onBlur={(event)=>{
                   if(event.target.value!=null)
                     this.setState({deadWeight: parseInt(event.target.value)?parseInt(event.target.value)+"kg":""});
                 }}
                 placeholder="Dead Weight" />
          <Button style={{width: '40%',paddingTop: '0.5%'}} id="search"
                  disabled={this.state.edit}
                  bsStyle="primary"
                  className="admin-btn-blue">Enter Dead Weight</Button>

        </div>



      </div>
    )
  }
}

class ManifestTable extends React.Component{
  constructor()
  {
    super();

  }
  render()
  {
    return (
      <div style={{backgroundColor: "#e6e6e6",marginTop: '0px'}}>
        <div className="admin-container" style={{marginTop: '0px'}}>
          <div className="filter-container">
            <button style={{marginTop: '2px'}} id="search"
                    onClick={()=>{
                      let orderIds = [];
                      Object.keys(this.state.active).map((key)=>{
                        if(this.state.active[key]==true)
                          orderIds.push(key);
                      });
                      axios.post("/tms/v1/externalVendor/createBooking",{orderIds: orderIds},{withCredentials: true,headers: {'X-Quikr-Client': 'app'}}).then((response)=>{
                        let responseString="";
                        orderIds.map((orderId)=>{
                          responseString+=orderId+", ";
                        });
                        toastr.success("Booking created successfully Order No: "+responseString);
                        //this.props.onSave(this.props.orderId);
                        console.log(response);
                      }).catch((error)=>{
                        console.log(error);
                      });
                    }}
                    className="admin-btn-blue">Send Email</button>
          </div>
        </div>
        <div className="table-container">
          <div className="selectAllRecords">
            <div id="selectAllWrapper"></div>
            <div id="clearAllWrapper"></div>
          </div>
          <div className="selectAllRecords">

          </div>
          <div className="table-container overflow" style={{fontFamily:'Gotham,Helvetica',border: 'solid 1px black'}}>
            <table className="table table-bordered manifestTable" >
              <thead style={{backgroundColor: '#e6e6e6'}} id="createdSlotsTbHead">
              {this.props.manifest.length>0?
                <tr>

                  <th width={"20%"}>
                    Pickup Date
                  </th>
                  <th width={"20%"} >
                    Customer Code
                  </th>
                  <th width={"25%"}>
                    ADD1
                  </th>
                  <th style={{width:"300px"}}>
                    ADD2
                  </th >
                  <th width={"25%"}>
                    ADD3
                  </th>

                  <th width={"16%"}>
                    Pincode
                  </th>

                  <th width={"16%"}>
                    Mobile_no
                  </th>

                  <th width={"16%"}>
                    Pickup_DT
                  </th>

                  <th width={"16%"}>
                    No of PKGS
                  </th>

                  <th width={"16%"}>
                    Actual_Wt
                  </th>

                  <th width={"16%"}>
                    Pro_ser_code
                  </th>

                  <th width={"16%"}>
                    Assigned To
                  </th>

                  <th width={"16%"}>
                    Cus_Ven_Code
                  </th>

                  <th width={"16%"}>
                    Order_No
                  </th>

                </tr>:<tr><th style={{textAlign: 'center',color: "#c6c6c6",width: '100%'}}>No data to display</th></tr>}
              </thead>
              <tbody id="searchResults">
              {this.props.manifest.map((manifest,index)=>{
                return <tr>
                  <td>{(manifest.pickupRequest).substr(0,10)}</td>
                  <td>{manifest.custCode}</td>
                  <td>{manifest.details[0].receiverAdd1}</td>
                  <td style={{width: "300px"}}>{manifest.details[0].receiverAdd2}</td>
                  <td>{manifest.details[0].receiverAdd3}</td>
                  <td>{manifest.details[0].receiverPinCode}</td>
                  <td>{manifest.details[0].receiverMobileNo}</td>
                  <td>{manifest.details[0].custDeliveyDate}</td>
                  <td>{manifest.details[0].noOfPkgs}</td>
                  <td>{manifest.details[0].pkgDetails.pkginfo[0].pkgWt}kg</td>
                  <td>..</td>
                  <td>{manifest.details[0].prodServCode}</td>
                  <td>{manifest.details[0].custVendCode}</td>
                  <td>{manifest.details[0].orderNo}</td>
                  <td></td></tr>
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    )

  }
}

class OrdersTable extends React.Component{
  constructor()
  {
    super();
    this.onSave  = this.onSave.bind(this);
    this.state={disabled: {}}
  }
  onSave(orderId){
    console.log(this[orderId])
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
    props.orders.map((order)=>{
      active[order.orderId]=false;
      disabled[order.orderId]=true;
    });
    this.setState({disabled: disabled,active: active});
  }

  render()
  {

    console.log(this.state);
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
                      axios.post("/tms/v1/externalVendor/createBooking",{orderIds: orderIds},{withCredentials: true,headers: {'X-Quikr-Client': 'app'}}).then((response)=>{
                        let responseString="";
                        orderIds.map((orderId)=>{
                          responseString+=orderId+", ";
                        });
                        toastr.success("Booking created successfully Order No: "+responseString);
                        //this.props.onSave(this.props.orderId);
                        console.log(response);
                      }).catch((error)=>{
                        console.log(error);
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
            <table width="100%" border="0" className="table table-bordered" cellspacing="0" cellpadding="0">
              <thead id="createdSlotsTbHead">
              {this.props.orders.length>0?
                <tr>

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
                return <tr>
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
                  <td>{order.buyerInfo.address}</td>
                  <td >
                    <CalculateWeight
                      onSave={this.onSave}
                      orderId={order.orderId}/>
                  </td></tr>
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}



class CreateManifestHome extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.getOrdersPagination = this.getOrdersPagination.bind(this);
    this.getManifest = this.getManifest.bind(this);
    this.changeActive = this.changeActive.bind(this);
    this.state = {vendors: [],vehicleAttributes: {hubs: []},manifest: [],
      offset: null,limit: null,orders: [], name: '',loading: 0,toggle: true,active: {}
    };
  }
  changeActive(active)
  {
    this.setState({active: active})
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  getManifest(hubId,vendorId)
  {
    axios.get("tms/v1/externalVendor/manifest?vendorId="+vendorId+"&hubId="+hubId,{headers: {'X-Quikr-Client': 'app'},withCredentials: true}).then((response)=>{
      console.log(response.data.manifest);
      this.setState({manifest: response.data.manifest,toggle: false});
    }).catch((error)=>{
      console.log(error);
    })
  }
  getOrders(hubId,vendorId,offset,limit)
  {
    let request = {
      paginationRequest:{offset:offset,limit:limit},
      orderSearchFilter:{
        orderStatus:"",
        orderSubStatus:"REACHED_HUB",
        weightCategory:"null",
        dateString:"NaN-aN-aN",
        adId:null,
        slotId:null,
        paymentType:"null",
        orderId:"",
        toBeDispatchType:"",
        hubName:hubId,
        user:this.props.userEmail,
        updatedBy:this.props.userEmail,
        vendorId:vendorId}};
    $(".paginationLoader").show();
    axios.post("/tms/v1/getScheduledOrders",request,{headers: {'X-Quikr-Client': 'logistics.agent'},withCredentials: true}).then((response)=>{
      console.log(response);
      $(".paginationLoader").hide();
      this.setState({orders: response.data.orders,offset: offset,limit: limit, hub: hubId,total: response.data.paginationResponse.total, vendor: vendorId,toggle: true});
    }).catch((error)=>{
      console.log(error);
    });
  }
  getOrdersPagination(hubId,vendorId,offset,limit)
  {
    if(offset<this.state.total) {
      let request = {
        paginationRequest: {offset: offset, limit: limit},
        orderSearchFilter: {
          orderStatus: "",
          orderSubStatus: "REACHED_HUB",
          weightCategory: "null",
          dateString: "NaN-aN-aN",
          adId: null,
          slotId: null,
          paymentType: "null",
          orderId: "",
          toBeDispatchType: "",
          hubName: hubId,
          user: this.props.userEmail,
          updatedBy: this.props.userEmail,
          vendorId: vendorId
        }
      };

      if (this.state.loading == 0) {
        $(".paginationLoader").show();
        this.setState({loading: this.state.loading + 1})
        axios.post("/tms/v1/getScheduledOrders", request, {
          headers: {'X-Quikr-Client': 'logistics.agent'},
          withCredentials: true
        }).then((response)=> {
          $(".paginationLoader").hide();
          console.log(response);
          let orders = this.state.orders;
          orders = orders.concat(response.data.orders);
          this.setState({orders: orders,offset: offset,limit: limit});
          this.setState({loading: 0})
        }).catch((error)=> {
          console.log(error);
        });
      }
    }

  }
  handleScroll(event)
  {

    if(this.state.toggle) {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {

        if (this.state.offset != null) {
          this.getOrdersPagination(this.state.hub, this.state.vendor, this.state.offset + this.state.limit, this.state.limit);
        }

      }
    }
  }
  componentDidMount()
  {
    window.addEventListener('scroll', this.handleScroll);
    axios.get("/tms/v1/getVendors",{headers: {'X-Quikr-Client': 'logistics.agent'},withCredentials: true}).then((response)=>{
      console.log(response);
      this.setState({vendors: response.data});
    }).catch((error)=>{
      console.log(error);
    });
    axios.get("/tms/v1/getVehicleAttributes",{headers: {'X-Quikr-Client': 'logistics.agent'},withCredentials: true}).then((response)=>{
      console.log(response);
      this.setState({vehicleAttributes: response.data});
    }).catch((error)=>{
      console.log(error);
    });

  }

  render() {
    console.log(this.state.orders);
    return  <div>
      <div className="col-md-12" >
        <Search hubs={this.state.vehicleAttributes.hubs}
                vendors={this.state.vendors}
                getOrders={this.getOrders}
                getManifest={this.getManifest}
                toggle={this.state.toggle}
                active={this.state.active}

        />
      </div>
      <div style={{background: 'white',
        marginBottom: 0,borderTop: 'solid',borderTopColor: '#e6e6e6'}}
           className="col-md-12">
        {this.state.toggle?
          <OrdersTable orders={this.state.orders} changeActive={this.changeActive} />:
          <ManifestTable manifest={this.state.manifest}/>}
      </div> &nbsp; </div>
      ;

  }
}


class GenerateManifestHome extends React.Component{
  constructor()
  {
    super();
    this.state={userId: null,userEmail: null};
  }
  componentDidMount()
  {


    let userId =document.getElementById("userId").value;
    let userEmail = document.getElementById("userEmail").value;

    this.setState({userId: userId,userEmail: userEmail});



  }
  render()
  {var products = [{
    id: 1,
    name: "Item name 1",
    price: 100
  },{
    id: 2,
    name: "Item name 2",
    price: 100
  }];

    return (
      <div style={{background: '#e6e6e6'}}>
        <CreateManifestHomes
          userId={this.state.userId}
          userEmail={this.state.userEmail}/>




      </div>)
  }

}


export default GenerateManifestHome;
//
