/**
 * Created by quikr on 3/28/17.
 */


import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';

class CalculateWeight extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={height: parseInt(props.height)!=0?parseInt(props.height)+"cm":"",
      length: parseInt(props.length)!=0?parseInt(props.length)+"cm":"",
      breadth: parseInt(props.breadth)!=0?parseInt(props.breadth)+"cm":"",
      actualWeight: parseInt(props.breadth)!=0?parseInt(props.actualWeight)+"kg":"",
      deadWeight: parseInt(props.deadWeight)!=0?parseInt(props.deadWeight)+"kg":"",
      edit: true,save: false,first: true};

    this.calculateActualWeight  = this.calculateActualWeight.bind(this);
    this.updateProductDimensionInfo = this.updateProductDimensionInfo.bind(this);
  }
  componentWillReceiveProps(props)
  {

  /*this.setState({height: parseInt(props.height)!=0?parseInt(props.height)+"cm":"",
      length: parseInt(props.length)!=0?parseInt(props.length)+"cm":"",
      breadth: parseInt(props.breadth)!=0?parseInt(props.breadth)+"cm":"",
      actualWeight: parseInt(props.actualWeight)!=0?parseInt(props.actualWeight)+"kg":"",
      deadWeight: parseInt(props.deadWeight)!=0?parseInt(props.deadWeight)+"kg":""});*/

  }
  updateProductDimensionInfo()
  {
    this.calculateActualWeight().then(()=>{
      axios.post("/tms/v1/updateProductDimensionInfo",{orderId: this.props.orderId,
        length: parseInt(this.state.length),
        width: parseInt(this.state.breadth),
        height: parseInt(this.state.height),
        weight: parseInt(this.state.actualWeight),
        vweight: parseInt(this.state.deadWeight),
        updatedBy: "dbadb"},{withCredentials: true,headers: {'X-Quikr-Client': 'app'}}).then((response)=>{
        this.setState({edit: true,save: false})
        this.props.onSave(this.props.orderId);
        toastr.success("Product Dimensions Updated");

      }).catch((error)=>{
        console.log(error);
      });


    });

    //this.setState({edit: true});


  }
  calculateActualWeight()
  {
    return new Promise((resolve,reject)=> {
      let length = parseInt(this.state.length);

      let breadth = parseInt(this.state.breadth);
      let height = parseInt(this.state.height);
      let actualWeight = ((length * breadth * height ) / 1728) * 7;
      this.setState({actualWeight: parseInt(actualWeight) + "kg"});
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
      <div key={this.props.orderId} style={{paddingLeft: 0}} className="col-md-12">
        <div style={{width: '25%'}}   className="col-sm-3">
          Length<br/>
          <input style={{width: "100%"}}
                 disabled={this.state.edit}
                 value={this.state.length}
                 onFocus={(event)=>{
                   if(event.target.value!=null)
                     this.setState({length: parseInt(event.target.value)?parseInt(event.target.value):""});
                 }}
                 onChange={(event)=>{
                   if(event.target.value!=null)
                     this.setState({length: parseInt(event.target.value)?parseInt(event.target.value):null});
                 }}
                 onBlur={(event)=>{

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
                this.setState({breadth: parseInt(event.target.value)?parseInt(event.target.value):""});
            }}
            onChange={(event)=>{
              if(event.target.value!=null)
                this.setState({breadth: parseInt(event.target.value)?parseInt(event.target.value):""});
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
                this.setState({height: parseInt(event.target.value)?parseInt(event.target.value):""});
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
                    actualWeight= parseInt(actualWeight);
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
                     this.setState({deadWeight: parseInt(event.target.value)?parseInt(event.target.value):""});
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

export default CalculateWeight;
