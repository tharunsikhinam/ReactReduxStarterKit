import React, {PropTypes} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
let toDate = new Date();
toDate.setDate(new Date().getDate()-30);
let fromDate = toDate;
class Filter extends React.Component {

    constructor() {
      super();
      this.state={fromDate: fromDate.toISOString(),toDate: new Date().toISOString(),
        tabs: {All: true,Credit: false,Debit: false,Pending: false}}
      this.handleFromDateChange = this.handleFromDateChange.bind(this);
      this.handleToDateChange = this.handleToDateChange.bind(this);
    }
    handleFromDateChange(value) {
      console.log(value);
      this.setState({
        fromDate: value // ISO String, ex: "2016-11-19T12:00:00.000Z"
      });
    }
    handleToDateChange(value)
    {
      this.setState({
        toDate: value // ISO String, ex: "2016-11-19T12:00:00.000Z"
      });
    }


    render() {
        return (
          <div className="col-md-12 filter-container" style={{width: '100%',marginLeft: 0,borderTop: 'none'}}>

            <div className="filter-list" style={{paddingLeft: 0}}>

              <div className="col-md-12" style={{paddingLeft: 0}}>
              <div className="select-category">
                <h2 className="lable-txt" style={{marginTop: 0,fontSize: '28px'}}>COD Passbook</h2>
                <ul onChange={(event)=>{
                  console.log(event.target.value);
                }} className="lable-tab">

                  {Object.keys(this.state.tabs).map((node)=>{
                    return <li
                      className={this.state.tabs[node]?"active":""}
                               style={{fontSize: '18px',lineHeight: '30px',height: '35px'}}
                               onClick={()=>{
                                 let tabs = Object.assign({},this.state.tabs);
                                 Object.keys(this.state.tabs).map((nodes)=>{
                                   if(nodes!=node)
                                   tabs[nodes]=false;
                                   else
                                     tabs[nodes]=true;
                                 });

                                 let requestObject = {fromDate: this.state.fromDate.substr(0,10),
                                   toDate: this.state.toDate.substr(0,10),
                                   type: node};
                                 this.props.submit(requestObject);
                                 this.setState({tabs: tabs});

                               }}
                               >{node}</li>
                  })}

                </ul>
              </div>
              <div className="select-category col-md-3" style={{marginRight: 0,paddingRight: 0}}
                   >
                <h3 className="lable-txt">From Date</h3>
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  disabled={this.state.tabs.Pending}
                  style={{width: '80%',display: 'inline'}}
                  showClearButton={false}
                  showTodayButton={true}
                  id="example-datepicker" value={this.state.fromDate} onChange={this.handleFromDateChange} />
              </div>

              <div className="select-category col-md-3" style={{marginRight: 0}}>

                <h3 className="lable-txt">To Date</h3>
                <DatePicker
                  disabled={this.state.tabs.Pending}
                  id="example-datepicker"
                  style={{width: '80%',display: 'inline'}}
                  dateFormat="DD/MM/YYYY"
                  value={this.state.toDate}
                  showClearButton={false}
                  showTodayButton={true}
                  onChange={this.handleToDateChange} />


              </div>

               <div className="select-category"
                    style={{marginLeft: 0,marginRight: 0,paddingLeft: 0,maginRight: 0}}
               >
                 <h3 className="lable-txt">&nbsp;</h3>
                <button
                  style={{height: '32px'}}
                  className="admin-btn-blue"
                  onClick={()=>{
                    let type = null;
                    Object.keys(this.state.tabs).map((node)=> {if(this.state.tabs[node]==true)
                      type=node;})
                    let requestObject = {fromDate: this.state.fromDate.substr(0,10),
                      toDate: this.state.toDate.substr(0,10),
                      type: type};
                    this.props.submit(requestObject);
                  }}
                  id="searchBtn">Search</button>&nbsp;&nbsp;

                 </div>
                <div className="select-category"
                     style={{marginLeft: 0,marginRight: 0,paddingLeft: 0,maginRight: 0}}
                >
                  <h3 className="lable-txt">&nbsp;</h3>
                  {this.props.isPending? <button
                    style={{height: '32px',display: 'inherit'}}
                    className="admin-btn-blue"
                    onClick={()=>{
                    this.props.onTransferAmount();
                    }}
                    id="searchBtn">Transfer Amount</button>:null}
                  &nbsp;&nbsp;

                </div>

            </div>
          </div>
            </div>
        );
    }
}

Filter.propTypes = {};

export default Filter;


