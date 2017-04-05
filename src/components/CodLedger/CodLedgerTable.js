import React, {PropTypes} from 'react';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

function onRowSelect(row, isSelected, e) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': "' + row[prop] + '"';
  }
  console.log(e);
  alert(`is selected: ${isSelected}, ${rowStr}`);
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  onSelect: onRowSelect,

};
class CodLedgerTable extends React.Component {

    constructor() {
      super();
      this.state={checked: {}}
      this.onExportToCSV = this.onExportToCSV.bind(this);

    }
    onExportToCSV()
    {
        return this.props.data;
    }
  createCustomExportCSVButton (onClick) {
    return (
      <button
        style={{fontSize: '14px'}}
        btnContextual='btn-danger'
        className='admin-btn-blue admin-btn-blue-bor'
        btnGlyphicon='glyphicon-edit'
        onClick={onClick}
      >Export</button>
    );
  }
  componentWillReceiveProps(props)
  {
    if(props.isPending == true)
    {
      let data = this.props.data;
      let status = {};
      data.map((node)=>{
        status[node.id] = false;
      });
      this.setState({status: status})
    }
  }

    render() {
      const options = {
        onExportToCSV: this.onExportToCSV,
        exportCSVBtn: this.createCustomExportCSVButton,
        paginationShowsTotal: true  // Enable showing total text
      };
        return (
          <BootstrapTable data={this.props.data}
                                maxHeight={"1000px"}
                                multiColumnSort={ 2}
                                exportCSV={true}
                                csvFileName='CODdownload.csv'
                                pagination
                                striped
                                search
                                bordered={true}
                                scrollTop={ 'Top' }
                                ignoreSinglePage
                                searchPlaceholder='Search Ledger'

                                 options={options}
                                hover>

            <TableHeaderColumn  width={"15"}

                                tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;"}}
                                dataField="transactionId"
                                hidden={this.props.isPending? false:true}
                                dataFormat={(cell,row)=>{
                                  return <input
                                    key={cell}
                                    onChange={()=>{
                                      var checked = this.state.checked;
                                      checked[cell] = !this.state.checked[cell];
                                      this.setState({checked: checked});
                                    }}
                                    type="checkbox" checked={this.state.checked[cell]}/>
                                }}
                                >&nbsp;</TableHeaderColumn>

            <TableHeaderColumn  width={"15"}

                                tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;"}}
                                dataField="transactionId"
                                dataSort={true}
                                isKey={true}>Id</TableHeaderColumn>
            <TableHeaderColumn dataField="paymentDateView"
                               csvHeader='Date'
                               tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;",fontWeight: '400'}}
                               dataSort={true}
                               sortFunc={(a,b,order)=>
                               {
                                 if(order=='desc')
                                   return a.paymentDate - b.paymentDate;
                                 else
                                   return b.paymentDate - a.paymentDate;
                               }}
                               filter={ {type: 'TextFilter', delay: 0, placeholder: 'mm/dd/yyyy'} }
                               width={"40"} dataFormat={(cell)=> {
              return cell;
            }}>&nbsp;<br/>Date</TableHeaderColumn>
            <TableHeaderColumn width={"40"}
                               tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;",fontWeight: '400'}}
                               filter={ {type: 'SelectFilter', options: {"ORDER": "ORDER","DRIVER":"DRIVER","USER":"USER"}, placeholder: 'Payer Type'} }
                               dataField="payerType">Payer <br/>Type</TableHeaderColumn>

            <TableHeaderColumn width={"70"}
                               tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;",fontWeight: '400'}}
                               filter={ {type: 'TextFilter', delay: 0, placeholder: 'Search'} }
                               dataField="payerDescription1"

                               dataFormat={(cell,row)=>{
                                 return <font>{cell}</font>
                               }}
            >Payer <br/>Description </TableHeaderColumn>
            <TableHeaderColumn width={"40"}
                               tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;",fontWeight: '400'}}
                               filter={ {type: 'SelectFilter', options: {"BANK": "BANK","DRIVER":"DRIVER","USER":"USER"}, placeholder: 'Recv Type'} }
                               dataField="receiverType">Receiver <br/>Type</TableHeaderColumn>


            <TableHeaderColumn width={"70"}
                               filter={ {type: 'TextFilter', delay: 0, placeholder: 'Search'} }
                               tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;",fontWeight: '400'}}
                               dataField="receiverDescription1"
                               dataFormat={(cell,row)=>{
                                 return <font>{cell}</font>
                               }}

            >Receiver <br/>Description </TableHeaderColumn>
            <TableHeaderColumn  width={"35"}
                                tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;",fontWeight: '400'}}
                                dataSort={true}
                                filter={ {type: 'TextFilter', delay: 0, placeholder: 'Amount'} }
                                dataField="paidAmount" expandable={true}>Paid<br/>Amount</TableHeaderColumn>

            <TableHeaderColumn  width={"40"}
                                tdStyle={{fontFamily: "font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;",fontWeight: '400'}}
                                filter={ {type: 'SelectFilter', options: {"DEBIT": "DEBIT","CREDIT":"CREDIT"}, placeholder: 'Transaction Type'} }
                                dataField="transactionType"  expandable={true}>Transaction <br/>Type</TableHeaderColumn>


          </BootstrapTable>

        );
    }
}

CodLedgerTable.propTypes = {};

CodLedgerTable.defaultProps={
  data: []
}

export default CodLedgerTable;


