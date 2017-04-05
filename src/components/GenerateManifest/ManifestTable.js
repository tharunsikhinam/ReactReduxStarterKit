/**
 * Created by quikr on 3/28/17.
 */



import React, {PropTypes} from 'react';
import axios from 'axios';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';


function columnClassNameStatusFormat(fieldValue, row, rowIdx, colIdx) {


  if (row %2 ==0 )
    return 'white';
  else
    return 'lightGrey';


}
var flattenObject = function(data) {

  var result = {};
  function recurse (cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for(var i=0, l=cur.length; i<l; i++)
        recurse(cur[i], prop ? prop+"."+i : ""+i);
      if (l == 0)
        result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop+"."+p : p);
      }
      if (isEmpty)
        result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
};

class ManifestTable extends React.Component{
  constructor()
  {
    super();
    this.state={manifestObjects: []}

  }
  componentDidMount()
  {
    if(this.props.manifest.length>=0)
    {
      let manifestObject = [];
      this.props.manifest.map((man)=>{
        manifestObject.push(flattenObject(man));
      })
      this.setState({manifestObjects: manifestObject})

    }

  }
  componentWillReceiveProps(props)
  {
    if(props.manifest.length>=0)
    {
      let manifestObject = [];
      props.manifest.map((man)=>{
        manifestObject.push(flattenObject(man));
      })
      this.setState({manifestObjects: manifestObject})

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
      <div style={{backgroundColor: "#e6e6e6",marginTop: '0px'}}>
        <div className="admin-container" style={{marginTop: '0px'}}>
          <div className="filter-container">
            <button style={{marginTop: '2px'}} id="search"
                    onClick={()=>{
                      if(this.props.manifest.length>0) {
                        axios.post("/tms/v1/externalVendor/manifest/sendEmail",
                          {vendorId: this.props.vendorId, hubId: this.props.hubId},
                          {withCredentials: true, headers: {'X-Quikr-Client': 'app'}}).then((response)=> {

                          toastr.success("Email Sent Successfully");
                          //this.props.onSave(this.props.orderId);

                        }).catch((error)=> {
                          toastr.error("Error Occurred")

                        });
                      }
                      else
                        toastr.info("Load Manifest");
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
          <div  className="overflow" style={{fontFamily:'Gotham,Helvetica'}}>
          <BootstrapTable
            containerStyle={{borderBottomStyle: 'solid', borderColor: '#428BCA', borderWidth: '1px',width: '150%'}}
            containerClass="table-container"

            tableHeaderClass="grey"
            trClassName={columnClassNameStatusFormat}
           // containerStyle={{width: '150%',overflowX: 'scroll'}}
            tableContainerClass="table table-bordered manifestTable" data={this.state.manifestObjects}
            pagination
            options={options}
          >
            <TableHeaderColumn width={"10%"} dataField="custCode" dataSort={true}
            >Cust Code</TableHeaderColumn>
            <TableHeaderColumn
              width={"10%"}
              dataField="pickupRequest" dataSort={true}
            >Pickup Date</TableHeaderColumn>
            <TableHeaderColumn
              width={"25%"}
              dataField="details.0.sellerAdd1" dataFormat={(cell,row)=>{
              return <font>
                <b> Name: </b>{row["details.0.sellerName"]}<br/>
                <b>MobileNo: </b>{row["details.0.sellerPhoneNo"]}<br/>
                <b>Address: </b>{row["details.0.sellerAdd1"]} &nbsp; {row["details.0.sellerAdd2"]}<br/>
                {row["details.0.sellerAdd3"]}<br/>{row["details.0.sellerCity"]} - {row["details.0.sellerPincode"]}</font>
            }}>Seller</TableHeaderColumn>

            <TableHeaderColumn

              width={"25%"}
              dataField="details.0.receiverAdd1" dataFormat={(cell,row)=>{
              return <font>
                <b>Name: </b>{row["details.0.receiverName"]}<br/>
                <b>MobileNo: </b>{row["details.0.receiverPhoneNo"]}<br/>
                <b>Address: </b>{row["details.0.receiverAdd1"]} &nbsp; {row["details.0.receiverAdd2"]}<br/>
                {row["details.0.receiverAdd3"]}<br/>{row["details.0.receiverCity"]} - {row["details.0.receiverPinCode"]}</font>
            }}>Receiver</TableHeaderColumn>



            <TableHeaderColumn
              width={"25%"}
              dataField="details.0.pkgDetails.pkginfo.0.pkgNo" dataFormat={(cell,row)=>{
              return <font><b>Pkg_no:</b>{row["details.0.pkgDetails.pkginfo.0.pkgNo"]}<br/>
                <b>L:</b>{row["details.0.pkgDetails.pkginfo.0.pkgLn"]+"cm"}&nbsp;<br/>
                <b>B:</b>{row["details.0.pkgDetails.pkginfo.0.pkgBr"]+"cm"}&nbsp;<br/>
                <b>H:</b>{row["details.0.pkgDetails.pkginfo.0.pkgHt"]+"cm"}<br/>
                <b>Wt:</b>{row["details.0.actualWt"]+"kg"}&nbsp;<b>VWt:</b>{row["details.0.actualWt"]+"kg"}
              </font>
            }}>Package Details</TableHeaderColumn>
            <TableHeaderColumn
              width={"15%"}
              dataField="details.0.CustDeliveyDate" dataSort={true}
              >Cust_Delivery_Date</TableHeaderColumn>

            <TableHeaderColumn
              width={"10%"}
              dataField="details.0.noOfPkgs">No of PKGS</TableHeaderColumn>
            <TableHeaderColumn
              width={"10%"}
              dataField="details.0.custVendCode">Cus_Ven_Code</TableHeaderColumn>
            <TableHeaderColumn
              width={"10%"}
              dataField="details.0.orderNo">Order No</TableHeaderColumn>

            <TableHeaderColumn
              width={"10%"}
              dataField="details.0.prodServCode" dataSort={true}
            >Pro_serv_code</TableHeaderColumn>
            <TableHeaderColumn
              width={"10%"}
              dataField="details.0.docketNo" dataSort={true}
                               isKey={true}>Docket No</TableHeaderColumn>





          </BootstrapTable>



            <div style={{display: 'none'}}>
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
            </table></div>
          </div>
        </div>
      </div>

    )

  }
}

export default ManifestTable;
