import React, {PropTypes} from 'react';
import OTPModal from './OTPModalOnly';
import axios from 'axios';

class TransferAmount extends React.Component {

    constructor() {
      super();
      this.state={open: false};
      this.close = this.close.bind(this);
    }
    close()
    {
      this.setState({open: false})
      location.reload();
    }
    componentDidMount()
    {

    }

    render() {
        return (
          <div>
            {this.state.open?<OTPModal
              open={this.state.open}
              close={this.close}
              checked={[]}
              transactions={[]}
              {...this.props}
            />:null}
            <button className="admin-btn-blue" onClick={()=>{
              this.setState({open: true});
            }
            }>Fund Transfer</button>

          </div>
        );
    }
}

TransferAmount.propTypes = {};

export default TransferAmount;


