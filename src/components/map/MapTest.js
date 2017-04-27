import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Marker} from 'google-map-react';
import {OverlayTrigger, Popover,Button} from 'react-bootstrap';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import _ from 'lodash';
import Sidebar from 'react-sidebar';
const MARKER_SIZE = 40;

const greatPlaceStyle = {
  position: 'absolute',
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  left: -MARKER_SIZE / 2,
  top: -MARKER_SIZE / 2
}

function mergeByProperty(arr1, arr2, prop) {
  _.each(arr2, function(arr2obj) {
    var arr1obj = _.find(arr1, function(arr1obj) {
      return arr1obj[prop] === arr2obj[prop];
    });

    //If the object already exist extend it with the new values from arr2, otherwise just add the new object to arr1
    arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
  });
}

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

class Polyline extends Component {
  constructor()
  {
    super();
    this.renderPolyline = this.renderPolyline.bind(this);
  }

  componentWillUpdate() {
    this.line.setMap(null)
  }

  componentWillUnmount() {
    this.line.setMap(null)
  }

  getPaths() {
    const { origin, destination } = this.props;

    return [
      { lat:  13.056865, lng: 77.623526},
      { lat: 13.056800, lng: 77.623000},
    ];
  }
  renderPolyline() {
    return {
      geodesic: true,
      strokeColor: 'black',
      strokeOpacity: 1,
      strokeWeight: 4
    }
  }


  render() {
    const Polyline = this.props.maps.Polyline

    const renderedPolyline = this.renderPolyline()
    const paths = { path: this.getPaths() }

    this.line = new Polyline(Object.assign({}, renderedPolyline, paths))

    this.line.setMap(this.props.map)

    return null
  }


}



class Order extends Component{
  constructor()
  {
    super();
    this.state={height: 20,width: 20}
  }
  render()
  {
    return <OverlayTrigger
      ref="trig"
      trigger={["hover","focus"]} placement="top" overlay={<Popover   title="Order Details">
      <li>Type: {this.props.data.type}</li>
      <li>OrderId: {this.props.data.orderId}</li>
      <li>Slot: {this.props.data.slot.startTime} - {this.props.data.slot.endTime}</li>
      </Popover>}
      ><img


      onClick={()=>{
        this.refs.trig.show();

      }}

      height={this.state.height} width={this.state.width} src="images/placeholder.svg"/>

      </OverlayTrigger>
  }
}


class Normal extends Component{

  constructor()
  {
    super();
    this.state={height: 30,width: 30};
    this.increaseSize = this.increaseSize.bind(this);
  }
  increaseSize()
  {
    this.setState({height: 40,width: 40})
  }
  render()
  {
    return<OverlayTrigger

      ref="trig"
      trigger={["hover","focus"]} placement="top" overlay={<Popover  style={{fontSize: '12px'}} >

      <li>Vehicle Type: {this.props.vehicleType}</li>
      <li>Driver Name: {this.props.data.driverName}</li>
      <li>Driver Mobile: {this.props.data.driverMobile}</li>
      <li>Trip Count: {this.props.data.tripsCount}</li>
      <li>Last Updated: {new Date(this.props.timeStamp).toLocaleString().substr(10,20)}</li>
    </Popover>}>
      <img



        onClick={()=>{
          this.props.toggleVisibility(null,this.props.vehicleType,this.props.data);

          this.refs.trig.show();
         // this.props.openDialog(this.props.data);
        }}

         height={this.state.height} width={this.state.width} src="images/delivery-truck.svg"/>
      </OverlayTrigger>
  }

}



class SimpleMap extends Component {
  constructor()
  {
    super();
    this.state = {mapLoaded: false,
      selected: null,
      selectedVehicles: {},
      map: null,
      maps: null,
      show: false,
      open: false,
      vehicleLocations: [],
      zoom: 11,
      center: {lat: 12.9716,lng: 77.5946},
      assignedTrips: []

    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.updateCenter = this.updateCenter.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }
  toggleVisibility(id1,id2,data)
  {
    let selectedVehicles = this.state.selectedVehicles;
    Object.keys(selectedVehicles).map((node1)=>{
      selectedVehicles[node1]=false;
      if(node1 == id2)
        selectedVehicles[node1]=true;
    });
    axios.get("http://localhost:3002/assignedTrips.json").then((response)=>{
      this.setState({assignedTrips: response.data.assignedTrips})
    });
    this.setState({selectedVehicles: selectedVehicles,selected: data})

  }
  openDialog()
  {
    axios.get("http://localhost:3002/assignedTrips.json").then((response)=>{
      this.setState({assignedTrips: response.data.assignedTrips})
    });
    this.setState({open: true});
  }

  componentDidMount()
  {

    axios.get("http://localhost:3002/vehicleLocation.json").then((response)=>{
        //console.log(response);
        let vehicleLocations = response.data.vehicleLocations;
        axios.get("http://localhost:3002/vehicleDetails.json").then((response)=>{

          let vehicleDetails = response.data;
          console.log(vehicleLocations);
          console.log(vehicleDetails);
          var selectedVehicles={}
          vehicleLocations.map((node)=>{
            selectedVehicles[node.vehicleType]=true;
          })
          mergeByProperty(vehicleLocations,vehicleDetails,"driverId");
          this.setState({vehicleLocations: vehicleLocations,selectedVehicles: selectedVehicles})

        }).catch((error)=>{

        });


      }).catch((error)=>{

      });
  }
  updateCenter()
  {

  }
  updateZoom()
  {

  }
  zoomOut()
  {

  }

  render() {

    let a=[];
    for(let i=0;i<1;i++)
    {
      a[i]={};
      a[i]['lng']=12.9716;
      a[i]['lat']=77.5946;
    }
    console.log(this.state.selected);
    return (
      <div className="col-md-12" style={{height: '100%'}}>
        <Sidebar

          open={true}
          docked={true}
          sidebar={<b width={"300px"}>Hello</b>}
        >
          Home
          </Sidebar>

        <div className="col-md-2" style={{display: 'block'}}>




          Vehicle's List
          {this.state.vehicleLocations.map((node)=>{
            return <div><li onClick={()=>{
              axios.get("http://localhost:3002/assignedTrips.json").then((response)=>{
                this.setState({assignedTrips: response.data.assignedTrips})
              });
              let selectedVehicles = this.state.selectedVehicles;
              Object.keys(this.state.selectedVehicles).map((node1)=>{
                selectedVehicles[node1]=false;
                if(node1 == node.vehicleType)
                  selectedVehicles[node1]=true;
              });

              this.setState({selected: node,selectedVehicles: selectedVehicles})
              console.log(this[node.vehicleType]);
              this[node.vehicleType].refs.trig.hide();
              let x = new Promise((resolve,reject)=>{
                this.setState({zoom: 15,center: {lat: Number(node.location.lat),lng: Number(node.location.lon)}})
                resolve(true);
              });
            }} onMouseEnter={()=>{
              if(this.state.selectedVehicles[node.vehicleType]) {
                var center = this.state.map.getCenter(); // works fine
                var bounds = this.state.map.getBounds(); // works fine
                var x = bounds.contains(center);
                var y = bounds.contains(new google.maps.LatLng(node.location.lat, node.location.lon));
                if (y)this[node.vehicleType].refs.trig.show();
              }
              }}

               onMouseLeave={()=>{
                 if(this.state.selectedVehicles[node.vehicleType])
                 this[node.vehicleType].refs.trig.hide();
               }}
            >{node.vehicleType}</li></div>
          })}
          <button onClick={()=>{
            this.setState({zoom: 11,
              center: {lat: Number(12.9716),lng: Number(77.5946)}});
          }}>Zoom out</button>

          <button  >Click Me too</button>
          <br/>
          asdfsda
          </div>
        <div className="col-md-3">
          Vehicle Details:

          {this.state.selected!=null?
          <div>
          <li>Vehicle Type: {this.state.selected.vehicleType}</li>
          <li>Driver Name: {this.state.selected.driverName}</li>
          <li>Driver Mobile: {this.state.selected.driverMobile}</li>
          <li>Trip Count: {this.state.selected.tripsCount}</li>
          <li>Last Updated: {new Date(this.state.selected.updatedTimestamp).toLocaleString().substr(10,20)}</li>
          </div>
            :null}
          Assigned Trips:
          {this.state.assignedTrips.map((node)=>{
            return <div>

              <li>Type: {node.type}</li>
              <li>OrderId: <a
                onMouseEnter={()=>{
                  this[node.orderId].refs.trig.show();}}

                onMouseLeave={()=>{
                  this[node.orderId].refs.trig.hide();
                }}

                href="#">{node.orderId}</a></li>
            </div>

          })}
          <button onClick={()=>{
            let selectedVehicles=this.state.selectedVehicles;
            Object.keys(selectedVehicles).map((node)=>{
              selectedVehicles[node]=true;
            });

            this.setState({assignedTrips: [],selected: null,selectedVehicles: selectedVehicles})
          }}> Back</button>

        </div>
        <div className="col-md-4" style={{display: 'none'}}>
          Vehicle Details
        </div>

        <div className="col-md-4" style={{display: 'none'}}>
          On Demand order detials
        </div>


      <div className="col-md-6" style={{width: '50%',height: '600px'}} >

        {true ?<GoogleMapReact
          onBoundsChange={(center,zoom,bounds,marginBounds)=>{
            console.log(zoom);
            this.setState({center: center,zoom: zoom})
          }}
          zoom={this.state.zoom}
          center={this.state.center}

          id="googleMapReact"
        className="googleMapReact"
        margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
        style={{marginRight: '20px'}}
        onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps:maps, mapLoaded: true }) }}
         yesIWantToUseGoogleMapApiInternals={true}
        >
          {this.state.vehicleLocations.map((node)=>{
            if(this.state.selectedVehicles[node.vehicleType]==true)
            return <Normal
              toggleVisibility = {this.toggleVisibility}
              selectedVehicles={this.state.selectedVehicles}
              data={node}
              ref={(input) => { this[node.vehicleType] = input; }}
              openDialog={this.openDialog}
              lat={node.location.lat}
              lng={node.location.lon}
              timeStamp={node.updatedTimestamp}
              vehicleType={node.vehicleType}
              text={"THANISANDRA"}
            />
          })}

          {this.state.assignedTrips.map((node)=>{
            return <Order

              data={node}
              ref={(input) => { this[node.orderId] = input; }}
              lat={node.address.latitude}
              lng={node.address.longitude}

            />
          })}
        </GoogleMapReact> : null}
        { this.state.mapLoaded ? <Polyline onClick={()=>{
        alert("route clicked");}
        } map={this.state.map} maps={this.state.maps} /> :null}

        <button
          style={{marginTop: '900px'}}
          onClick={()=>{
            let maps = this.state.map;
          maps.data.loadGeoJson(
            'https://storage.googleapis.com/mapsdevsite/json/google.json');
          this.setState({map: maps});
        }}>Click me</button>

       <Dialog
         onRequestClose={()=>{
           this.setState({open: false})
         }}
         open={this.state.open} modal={false}>
         <h3>Assigned Trips:</h3>
         {this.state.assignedTrips.map((node)=>{
           return <div>

           <li>Type: {node.type}</li>
           <li>OrderId: {node.orderId}</li>
             </div>

         })}

         </Dialog>


        </div>
        </div>
    );
  }
}

SimpleMap.defaultProps = {
  center: {lat: 12.9716,lng: 77.5946},
  zoom: 11

};
export default SimpleMap;
