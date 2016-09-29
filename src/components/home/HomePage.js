/**
 * Created by quikr on 7/12/16.
 */
import React from 'react';
import { Link } from 'react-router';

class Heading extends React.Component

{

  componentWillMount()
  {

    //before mounting. can't do ajax calls here
    //can't change the state
    console.log("MOUNTING YEAAA");

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
    console.log("got fucked");
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
  constructor()
  {
    super();
    this.state= {message: "Quikr HRMS",flag: true};
    this.props = {default_text: 'hi'}
  }

  render()
  {
    const style={
      backgroundColor: 'black'
    };
    return (
      <div className="jumbotron">
        {this.state.flag ? <Heading name={this.state.message}/>:<p>BAlls to you</p>}
         <Heading name={this.state.message}/>
        <p style={style}>Login</p>dsafdsaf

        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
        <button onClick={
          (event)=>{
            console.log(event);
            this.setState({message: "BHANU's reACT PROJECT"})
            this.setState({flag: !this.state.flag});


        }}>CLICK ME</button>
      </div>
    );
  }
}
export default HomePage;

