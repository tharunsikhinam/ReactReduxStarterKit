import React, {PropTypes} from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import axios from 'axios';

class OTPModal extends React.Component {

    constructor() {
      super();
      this.state={authorizedUsers: []}
    }
    componentDidMount()
    {
      //get list of authorized users.
      let requestQuery = "userId="+this.props.userId+"&userType="+this.props.userType;
      axios.get(this.props.apiHost + "/tms/v1/codPayment/authorized/users?" + requestQuery,
        {
          headers: {'X-Quikr-Client': 'falcon.api', 'Content-Type': 'application/json'}

        }).then((response)=> {


      }).catch((error)=>{
        console.log("Error Occurred");
      })



      }

    render() {
        return (
          <div>
            <Modal
              bsSize="small"
              bsStyle="primary"
              show={true} onHide={()=>{}}>
              <Modal.Header closeButton>
                <Modal.Title>Fund Transfer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hello
              </Modal.Body>
            </Modal>

          </div>
        );
    }
}

OTPModal.propTypes = {};

export default OTPModal;


