/**
 * Created by quikr on 7/27/16.
 */
/**
 * Created by quikr on 7/27/16.
 */
import React, {PropTypes} from 'react';

class Loading extends React.Component {
  constructor(props, context) {
    super();
    this.state = {frame: 1};
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        frame: this.state.frame + 1
    })
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1 );
    let text = ' ';
    while (dots > 0) {
      text += '.';
      dots--;
    }

    return <span {...this.props}>{text}&nbsp;</span>;

  }
}

Loading.defaultProps = {
  interval:300 , dots: 3
};

Loading.PropTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number
};

export default Loading;
