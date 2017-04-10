/**
 * Created by quikr on 7/12/16.
 */
import React from 'react';
import { Link } from 'react-router';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import DatePicker from 'react-bootstrap-date-picker';
import Filter from './Filter';
import axios from 'axios';
import CodLedgerTable from './CodLedgerTable';
import toastr from 'toastr';
import moment from 'moment';
import OTPModal from './OTPModal';

function GetFormattedDate(time) {
  var todayTime = new Date(time);
  var month = (todayTime.getMonth() + 1);
  var day = (todayTime.getDate());
  var year = (todayTime.getFullYear());
  return day + "/" + month + "/" + year;
}

function changeTransactionObject(object)
{

  object.map((node)=>{
    node.payerDescription1 =node.payerDescription1+" "+node.payerDescription2;
    node.receiverDescription1 = node.receiverDescription1 + " " + node.receiverDescription2;
    node.paymentDateView = moment(node.paymentDate).format('DD/MM/YYYY');

  });

  return object;

};

class Heading extends React.Component

{
  constructor()
  {
    super();
  }

  componentWillMount()
  {

    //before mounting. can't do ajax calls here
    //can't change the state
    //console.log("MOUNTING YEAAA");

  }
  componentDidMount()
  {
    //called after component got mounted.

    //do all ajax calls here..
  }
  componentWillReceiveProps(props)
  {
    console.log(props.name);
    //on receive of new props do some actions change state or anything..
  }
  shouldComponentUpdate(prevState,nextState)
  {
    //return boolean

  }
  render()
  {
    return (
      <h1>{this.props.name}</h1>

    );
  }
  componentWillUnmount()
  {
    //do some cleanup after ur leaving page.

  }
}
Heading.PropTypes={
  name: React.PropTypes.string
};
Heading.DefaultProps={
  name: "tharun"
};



class HomePage extends React.Component

{
  constructor(props)
  {
    super(props);
    this.state= {message: "Quikr HRMS",flag: true,openModal: false,
       data: [],credit: [],debit: [],all: [],pending: [],isPending: false,transactions: [],selectedTransactions: []};
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.search = this.search.bind(this);
    this.getPendingTransactions = this.getPendingTransactions.bind(this);
    this.selectTransactions = this.selectTransactions.bind(this);
    this.onTransferAmount = this.onTransferAmount.bind(this);
    this.closeTransferAmount = this.closeTransferAmount.bind(this);
  }

  selectTransactions(transactions)
  {
    this.setState({transactions: transactions});
  }
  onTransferAmount()
  {
    console.log("button clicked");
    console.log(this.state);
    let pendingTransactions = this.state.pending;
    let selectedTransactions = pendingTransactions.filter((node)=>{
      if(this.state.transactions[node.transactionId]==true)
        return true;
    });
    if(selectedTransactions.length<=0) {
      toastr.info("Select Transactions")
      return;
    }

    console.log(selectedTransactions);
    this.setState({openModal: true,selectedTransactions: selectedTransactions})
  }
  closeTransferAmount(checked)
  {
    this.getPendingTransactions();
   // this.selectTransactions(checked);
    setTimeout(()=>{this.setState({openModal: false,transactions: checked});},1000);
  }



  componentDidMount()
  {
    let toDate = new Date();
    toDate.setDate(new Date().getDate()-30);
    let fromDate = toDate;
    let requestObject = {
      fromDate: fromDate.toISOString().substr(0,10),
      toDate: new Date().toISOString().substr(0,10)
    };
    this.handleTypeChange('All',requestObject);
  }
  handleTypeChange(type,requestObject)
  {
    switch(type)
    {
      case 'Debit': this.getLedger(requestObject).then(()=>{
                         this.setState({data: this.state.debit,type:'Debit'});
                    }).catch((error)=>{
                      toastr.error("Error Occurred");
                    });

                    break;
      case 'Credit':this.getLedger(requestObject).then(()=>{
                    this.setState({data: this.state.credit,type: 'Credit'});
                    }).catch((error)=>{
                      toastr.error("Error Occurred");
                    });

                    break;
      case 'All':   this.getLedger(requestObject).then(()=>{
                      this.setState({data: this.state.all,type: 'All'});
                      }).catch((error)=>{
                    toastr.error("Error Occurred");
                    });
                    break;
      case 'Pending': this.getPendingTransactions();
                      break;
    }

  }
  getPendingTransactions()
  {
    let requestQuery = "userId="+this.props.userId+"&userType=USER&";
    axios.get(this.props.apiHost + "/tms/v1/codPayment/getPendingTransactions?"+requestQuery,
      {headers:{'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'}}).then((response)=>{
       console.log(response);
       let transactions = response.data;
       transactions = changeTransactionObject(transactions);
       this.setState({data: transactions,pending: transactions,type: 'Pending',isPending: true,transactions: []});

    }).catch((error)=>{
      console.log(error);
    })

  }
  getLedger(requestObject)
  {
    return new Promise((resolve,reject)=> {
      let requestQuery = "userId="+this.props.userId + "&userType=" +this.props.userType+ "&fromDate=" + requestObject.fromDate + "&toDate=" + requestObject.toDate;
      axios.get(this.props.apiHost + "/tms/v1/codPayment/getAllTransactions?" + requestQuery,
        {
          headers: {'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'}

        }).then((response)=> {
        console.log(response.data.transactions);
        let transactions = response.data.transactions;
        let credit = [], debit = [], pending = [];
        transactions = changeTransactionObject(transactions);
        transactions.map((node)=> {
          if (node.transactionType == 'CREDIT')
            credit.push(node);
          else if (node.transactionType == 'DEBIT')
            debit.push(node);
        });
        this.setState({data: transactions, all: transactions, credit: credit, debit: debit,isPending: false,transactions: []});
        resolve(true);

      }).catch((error)=> {

        reject(false);

        console.log(error);
      })
    });
  }
  search(requestObject)
  {
    this.handleTypeChange(requestObject.type,requestObject);
  }

  render()
  {
     
    const style={
      backgroundColor: 'black'
    };
    return (
      <div className="col-md-12" style={{borderTop: 'solid #008BCF 1px',paddingLeft: 0,paddingRight: 0}}>
    <div className="col-md-1" ></div>
        <div className="col-md-12"style={{width: '100%'}}>
      <div className="admin-container" style={{marginTop: 0}}>

        <div className="col-md-12" style={{borderBottom: 'solid green 1px'}}>
        <Filter
          isPending={this.state.isPending}
          submit={this.search}
          handleTypeChange={this.handleTypeChange}
          onTransferAmount = {this.onTransferAmount}

        />
        </div>

        {this.state.openModal?
          <OTPModal
            open={this.state.openModal}
            checked={this.state.transactions}
            transactions={this.state.selectedTransactions}
            close={this.closeTransferAmount}
            {...this.props}

          />:null}

         <div className="col-md-12" style={{padingLeft: 0,paddingRight: 0}}>
          <CodLedgerTable
            key={this.state.isPending+"abc"}
            selectTransactions={this.selectTransactions}
            isPending={this.state.isPending}
            data={this.state.data}/>

        </div>
        </div>
  <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}
export default HomePage;

