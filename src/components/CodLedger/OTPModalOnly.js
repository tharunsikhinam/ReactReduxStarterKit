import React, {PropTypes} from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import axios from 'axios';
import OTPButton from './OTPButton';
import moment from 'moment';
import toastr from 'toastr';
function changeTransactionObject(object)
{

  object.map((node)=>{
    node.payerDescription1 =node.payerDescription1+" "+node.payerDescription2;
    node.receiverDescription1 = node.receiverDescription1 + " " + node.receiverDescription2;
    node.paymentDateView = moment(node.paymentDate).format('DD/MM/YYYY');

  });

  return object;

};

class OTPModal extends React.Component {

    constructor() {
      super();
      this.state={authorizedUsers: [],transactions: [],selected: "",checked: [],next: false}
      this.showSelectedTransactions = this.showSelectedTransactions.bind(this);
    }
    componentDidMount()
    {

      let requestQuery2 = "userId="+this.props.userId+"&userType=USER&";
      axios.get(this.props.apiHost + "/tms/v1/codPayment/getPendingTransactions?"+requestQuery2,
        {headers:{'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'}}).then((response)=>{
        console.log(response);
        let transactions = response.data;
        transactions = changeTransactionObject(transactions);
        this.setState({transactions: transactions,checked: []});

      }).catch((error)=>{
        console.log(error);
      });
      //get list of authorized users.
      let requestQuery = "userId="+this.props.userId+"&userType="+this.props.userType;
      axios.get(this.props.apiHost + "/tms/v1/codPayment/authorized/users?" + requestQuery,
        {
          headers: {'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'}
        }).then((response)=> {
          console.log(response);
          let authorizedUsers = response.data;
          var arrResult = {};
          authorizedUsers.map((node)=>{
            arrResult[node.userId]=node;
          });
          authorizedUsers=[];var i=0;
          for(var item in arrResult)
          {
            authorizedUsers[i++]=arrResult[item];
          }

          this.setState({authorizedUsers: authorizedUsers})
      }).catch((error)=>{
        console.log("Error Occurred");
      })
    }
    showSelectedTransactions()
    {

      let checked = this.state.checked;

      return <div className="col-md-6">
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody cellSpacing={"10px"} cellPadding={"20px"}>
          {checked.map((node,index)=>{
            if(node)
              return <tr>
                <td>{this.state.transactions[index].transactionId}</td>
                <td>{this.state.transactions[index].paidAmount}</td>
              </tr>
          })}
            </tbody>
          </table>
      </div>

    }



    render() {
      let totalAmount =0;
      this.state.checked.map((node,index)=>{
        if(node)
        totalAmount += this.state.transactions[index].paidAmount;
      });
        return (
          <div >
            <Modal

              show={this.props.open} onHide={()=>{
                this.setState({next: false, transactions: [],checked: []})
                this.props.close();
            }}>
              <Modal.Header closeButton>
                <Modal.Title>Fund Transfer</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{backgroundColor: 'white',opacity: '1'}}>





                <div style={{display: this.state.next?'none':''}}>
                <h4>Select Transactions:</h4> <b>Total Amount:</b> {totalAmount}
                <div className="col-md-12" style={{display: 'block',borderBottom: 'solid 1px black',paddingLeft: 0}}>
                  <div className="col-md-12"style={{paddingLeft: 0}} >
                    <table className="table table-bordered">
                      <thead>
                      <tr>
                        <th></th>
                        <th>Transaction Id</th>
                        <th>Transaction Date</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                      </tr>
                      </thead>
                      <tbody cellSpacing={"10px"} cellPadding={"20px"}>
                      {this.state.transactions.length==0?<tr><td style={{textAlign: 'center'}} colSpan="5">No Pending Transactions</td></tr>:null}
                      {this.state.transactions.map((node,index)=>{
                        return<tr>
                          <td><input

                            type="checkbox"
                                     onChange={()=>{
                                       let checked = this.state.checked;
                                       if(!checked[index]) {
                                         checked[index]=true;
                                         this.setState({checked: checked})
                                       }
                                       else {
                                         checked[index]=!this.state.checked[index];
                                         this.setState({checked: checked})
                                       }
                                     }}
                                     checked={this.state.checked[index]}/></td>
                          <td >{node.transactionId}</td>
                          <td>{node.paymentDateView}</td>
                          <td>{node.receiverDescription1}</td>
                          <td>{node.paidAmount}</td>
                        </tr>
                      })}

                      </tbody>
                    </table>
                  </div>
                  <h4>Select User</h4>
                  <select value={this.state.selected}
                          onChange={(selected )=>{
                            //console.log(JSON.stringify(selected.target.value));
                            this.setState({selected: selected.target.value});
                            //console.log(x);
                          }}
                          className="form-control">
                    <option value="" >Select User</option>

                    {this.state.authorizedUsers.map((node)=>{
                      let value = node.userId+";"+node.mobile+";"+node.email+";"+node.name;
                      if(node.mobile!=null)
                        return <option value={value} >{node.name}&nbsp;-&nbsp;{node.mobile}</option>
                    })}
                  </select>
                  <br/>
                  </div>
                  </div>





                <div>
                  <div style={{display: this.state.next?'':'none'}}>
                    {this.showSelectedTransactions()}

                    <div className="col-md-6" style={{paddingLeft: 0}}>
                      <b>Receiver:</b>&nbsp;{this.state.selected.split(';')[3]}<br/>
                      <b>Total Amount:</b>&nbsp;{totalAmount}<br/>
                      <b>Payment Date:</b>&nbsp;{new Date().toGMTString().substr(0,16)}<br/><br/>
                    </div>




                  <OTPButton
                    {...this.props}
                    totalAmount = {totalAmount}
                    selected={this.state.selected}
                    checked={this.state.checked}
                    transactions={this.state.transactions}
                    disabled={this.state.selected==""?true: false}
                  />

                    </div>
                  <br/>
                  <button
                    onClick={()=> {
                      if (!this.state.next) {
                        if (this.state.selected == "") {
                          toastr.error("Select User/Bank");
                          return;
                        }

                        let flag = false;
                        console.log(this.state.checked);
                        this.state.checked.map((node)=>{
                          console.log(node);
                          if(node==true)
                            flag = true;
                        });
                        if(!flag)
                          {toastr.error("Select Transactions");
                          return;}

                        this.setState({next: true});

                    }
                      else {
                        let requestQuery2 = "userId="+this.props.userId+"&userType=USER&";
                        axios.get(this.props.apiHost + "/tms/v1/codPayment/getPendingTransactions?"+requestQuery2,
                          {headers:{'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'}}).then((response)=>{
                          console.log(response);
                          let transactions = response.data;
                          transactions = changeTransactionObject(transactions);
                          this.setState({transactions: transactions,checked: [],next: false});

                        }).catch((error)=>{
                          console.log(error);
                        });

                      }
                    }}

                    className="btn btn-block btn-primary">{this.state.next?"Go Back":"Next"}</button>


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


