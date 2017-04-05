/**
 * Created by quikr on 3/28/17.
 */

import React, {PropTypes} from 'react';
import axios from 'axios';
import Search from './Search';
import OrdersTable from './OrdersTable';
import ManifestTable from './ManifestTable';


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
      hubId: null,vendorId: null,
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
    this.setState({manifest: []});
    $(".paginationLoader").show();
    axios.get("tms/v1/externalVendor/manifest?vendorId="+vendorId+"&hubId="+hubId,{headers: {'X-Quikr-Client': 'app'},withCredentials: true}).then((response)=>{

      this.setState({manifest: response.data.manifest,toggle: false,hubId: hubId,vendorId: vendorId});
      $(".paginationLoader").hide();
    }).catch((error)=>{

      toastr.error("Error Occurred");
      $(".paginationLoader").hide();
    })
  }
  getOrders(hubId,vendorId,offset,limit)
  {
    $(".paginationLoader").show();
    this.setState({orders: []})
    axios.get("tms/v1/externalVendor/pendingOrders?vendorId="+vendorId+"&hubId="+hubId,{headers: {'X-Quikr-Client': 'app'},withCredentials: true}).then((response)=>{
      $(".paginationLoader").hide();

      this.setState({orders: response.data.orders,toggle: true,hubId: hubId,vendorId: vendorId});
    }).catch((error)=>{
      toastr.error("Error Occurred");
      $(".paginationLoader").hide();

    })
    /*let request = {
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
    });*/
  }
  getOrdersPagination(hubId,vendorId,offset,limit)
  {
    /*
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
          this.setState({orders: orders});
          this.setState({loading: 0})
        }).catch((error)=> {
          console.log(error);
        });
      }
    }*/

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

      this.setState({vendors: response.data});
    }).catch((error)=>{

    });
    axios.get("/tms/v1/getVehicleAttributes",{headers: {'X-Quikr-Client': 'logistics.agent'},withCredentials: true}).then((response)=>{

      this.setState({vehicleAttributes: response.data});
    }).catch((error)=>{

    });

  }

  render() {

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
          <ManifestTable
            hubId={this.state.hubId}
            vendorId={this.state.vendorId}
            manifest={this.state.manifest}/>}
      </div> &nbsp; </div>
      ;

  }
}
export default CreateManifestHome;
