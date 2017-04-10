import React, {PropTypes} from 'react';
import axios from 'axios';
import toastr from 'toastr';


function isUrlValid(userInput) {
  var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if(res == null)
    return false;
  else
    return true;
}
class OTPButton extends React.Component {

    constructor() {
      super();
      this.state={errorText: "",generateOtp: false,otpId: null,success: false}
      this.verifyOtp = this.verifyOtp.bind(this);
      this.regenerateOtp = this.regenerateOtp.bind(this);
      this.submitCodTransaction = this.submitCodTransaction.bind(this);

    }
    submitCodTransaction()
    {
      let bank = false;
      if(this.props.disabled==false)
      {
        if(this.props.selected.split(";")[0]=="1")
          bank =true;
      }
      let transactions =[];
      this.props.transactions.map((node)=>{
        transactions.push(node.transactionId);
      });
      let requestObject =
      {
        payerId: this.props.userId,
        receiverId: parseInt(this.props.selected.split(";")[0]),
        payerType: "USER",

        paidAmount: this.props.totalAmount,
        transactionIds: transactions,
        paymentDate: new Date().getTime(),
        user: this.props.email

      };
      if(bank) {
        if(this.receiptInput.value.length==0) {toastr.error("Enter receipt URL link"); return;}
        if(isUrlValid(this.receiptInput.value)) {
          requestObject.receiptImageUrl = this.receiptInput.value;
          requestObject.receiverType = "BANK";
        }
        else
          toastr.error("Invalid URL Entered");
      }
      else {
        requestObject.otp = this.textInput.value;
        requestObject.otpId = this.state.otpId;
        requestObject.receiverType = "USER";
      }


      axios.post(this.props.apiHost + "/tms/v1/codPayment/submitTransactions" ,requestObject,
        {
          headers: {'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'},
          withCredentials: true
        }).then((response)=> {
          toastr.success("Transaction Successful");
          this.setState({success: true})
          console.log(response)

      }).catch((error)=>{
          console.log(error.response.data);
        let errorData = error.response.data;
        if(error.response.data)
        if(error.response.data.SubmitCodTransactionsResponse.errors.length>0)
        {
          error.response.data.SubmitCodTransactionsResponse.errors.map((node)=>{
            toastr.error(node.message);
            this.setState({errorText: node.message})
          })
        }
        console.log(JSON.stringify(error));
        });
        console.log(requestObject);
    }
    verifyOtp()
    {
      let request ={
        otpClientId: this.props.otpClientId,
        email: this.props.selected.split(';')[2],
        mobile: this.props.selected.split(';')[1],
        otpId: this.state.otpId,
        otp: this.textInput.value
      };
      this.submitCodTransaction();
       }
      regenerateOtp()
      {
        let request={
          clientId: this.props.otpClientId,
          otpId: this.state.otpId,
          isResend: true,

        }
        axios.post(this.props.apiHost + "/tms/v1/app/gererateOtp" ,request,
          {headers: {'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'},
            withCredentials: true
          }).then((responses)=> {
            console.log(responses);
          let response = responses.data;
          if(response.appGenerateOtpResponse.success.issmsSent) {
            toastr.success("OTP Regenerated")
            this.setState({errorText: ""})
          }
          else{
            toastr.error("Unable to regenerate OTP")
          }

        }).catch((error)=>{
          let response = error.response.data;
          if(response.appGenerateOtpResponse.errors.length>0)
          {
            response.appGenerateOtpResponse.errors.map((error)=>{
              toastr.error(error.message);
            })
          }

            this.setState({errorText: ""})
        })

      }



    render() {
      let bank = false;
      if(this.props.disabled==false)
      {
        if(this.props.selected.split(";")[0]=="1")
          bank =true;
      }

        return (
          <div>

            {this.state.generateOtp?
              <div style={{width: '50%',textAlign: 'center',margin: "auto"}}>
                <h4>Enter OTP</h4>
                <input type="text"
                       ref={(input) => { this.textInput = input; }}
                       className="form-control"/>

                {this.state.errorText!=""? <font color="red">{this.state.errorText}</font>:null}</div>:null}
            {bank?<div style={{width: '50%',textAlign: 'center',margin: "auto"}}>
              <h4>Enter Receipt Image Url</h4>
              <input type="text"
                     ref={(input) => { this.receiptInput = input; }}
                     className="form-control"/>

             </div>:null}
            <br/>


            {this.state.generateOtp?
              <button className="btn btn-success btn-block"
                      onClick={this.state.success?null:this.verifyOtp}
            >{this.state.success?"Transaction Successfull":"Verify and Submit Transaction"}</button>:null }




            {bank?<button className="btn btn-success btn-block"
                          onClick={this.state.success?null:this.submitCodTransaction}
            >{this.state.success?"Transaction Successfull":"Submit Transaction"}</button>:

              !this.state.success?<button className="btn btn-block btn-primary"
                      onClick={this.state.otpId==null?()=>{

                        let request ={
                          otpClientId: this.props.otpClientId,
                          email: this.props.selected.split(';')[2],
                          mobile: this.props.selected.split(';')[1],
                          attributes: {}
                        };
                        console.log(request);
                        axios.post(this.props.apiHost+"/tms/v1/app/gererateOtp" ,request,
                          {
                            headers: {'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'},
                            withCredentials: true
                          }).then((response)=> {
                          console.log(response);
                          if(response.data.appGenerateOtpResponse.success.issmsSent) {
                            this.setState({otpId: response.data.appGenerateOtpResponse.success.otpId,generateOtp: true})
                          }
                          else
                          {
                            toastr.error("Unable to send OTP. Try again")
                            this.setState({errorText: "Generate new OTP",generateOtp: false})
                          }
                          console.log(this.state);


                        }).catch((error)=>{
                          let response = error.response.data;
                          if(response.appGenerateOtpResponse.errors.length>0)
                          {
                            response.appGenerateOtpResponse.errors.map((error)=>{
                              toastr.error(error.message);
                            })
                          }
                          console.log(error);
                        })

                      }:this.regenerateOtp}
                      disabled={this.props.disabled}
              >{this.state.otpId==null?"Generate OTP":"Regenerate OTP"}</button>:null}



          </div>
        );
    }
}

OTPButton.propTypes = {};

export default OTPButton;


