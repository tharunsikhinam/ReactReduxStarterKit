import React, {PropTypes} from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import axios from 'axios';
import OTPButton from './OTPButton';


class OTPModal extends React.Component {

    constructor() {
      super();
      this.state={authorizedUsers: [],selected: ""}
    }
    componentDidMount()
    {
      //get list of authorized users.
      let requestQuery = "userId="+this.props.userId+"&userType="+this.props.userType;
      axios.get(this.props.apiHost + "/tms/v1/codPayment/authorized/users?" + requestQuery,
        {
          headers: {'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'}

        }).then((response)=> {
          console.log(response);
          this.setState({authorizedUsers: response.data})


      }).catch((error)=>{
        console.log("Error Occurred");
      })



      }

    render() {
      let totalAmount =0;
      this.props.transactions.map((node)=>{
        totalAmount += node.paidAmount;
      })
        return (
          <div >
            <Modal

              show={this.props.open} onHide={()=>{
                console.log(this.props.checked);
                this.props.close(this.props.checked);
            }}>
              <Modal.Header closeButton>
                <Modal.Title>Fund Transfer</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{backgroundColor: 'white',opacity: '1'}}>

                <h3>Select User or Bank</h3>

                <select value={this.state.selected}
                        onChange={(selected )=>{
                          //console.log(JSON.stringify(selected.target.value));
                          this.setState({selected: selected.target.value});
                          //console.log(x);
                        }}
                        className="form-control">
                  <option value="" >Select User/Bank</option>
                  <option value="1;0;0;BANK" >BANK</option>
                  {this.state.authorizedUsers.map((node)=>{
                    let value = node.userId+";"+node.mobile+";"+node.email+";"+node.name;

                  return <option value={value} >{node.name}&nbsp;-&nbsp;{node.mobile}</option>
                  })}
                </select>
                <br/>
                <b>Transactions Selected:</b>
                <div className="col-md-12" style={{display: 'block',borderBottom: 'solid 1px black',paddingLeft: 0}}>
                  <div className="col-md-6"style={{paddingLeft: 0}} >
                    <table className="table table-bordered">
                      <thead>
                      <tr>
                        <th>Transaction Id</th>
                        <th>Amount</th>
                      </tr>
                      </thead>
                      <tbody cellSpacing={"10px"} cellPadding={"20px"}>
                      {this.props.transactions.map((node)=>{
                        return<tr>
                          <td >{node.transactionId}</td>
                          <td>{node.paidAmount}</td>
                        </tr>
                      })}

                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <b>Receiver:</b>&nbsp;{this.state.selected.split(';')[3]}<br/>
                    <b>Total Amount:</b>&nbsp;{totalAmount}<br/>
                    <b>Payment Date:</b>&nbsp;{new Date().toGMTString().substr(0,16)}<br/>
                  </div>
                </div>
                <div>
                  <OTPButton
                    {...this.props}
                    totalAmount = {totalAmount}
                    selected={this.state.selected}
                    transactions={this.props.transactions}
                    disabled={this.state.selected==""?true: false}
                  />
                  <br/>
                  <button
                    onClick={this.props.close}
                    className="btn btn-block btn-default">Cancel</button>
                  </div>
                &nbsp;
                &nbsp;

              </Modal.Body>
            </Modal>

          </div>
        );
    }
}

OTPModal.propTypes = {};

export default OTPModal;


