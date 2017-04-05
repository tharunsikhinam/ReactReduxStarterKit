import React, {PropTypes} from 'react';


class Layout extends React.Component {

    constructor() {
      super();

      this.state=({values: [[null,null,null],['X',null,null],[null,null,null]],player: true})
    }

    render() {
        return (
          <table>
            <thead>
            <th>Hey</th>
            </thead>
            <tbody className="ticTable" style={{padding: '20px'}}>
            <tr>
            {this.state.values.map((row,rowIndex)=>{


              return (
                <tr>
                  {row.map((cell,colIndex)=>{


                return (
                <td style={{padding: '20px',borderRightStyle: 'dashed',borderBottomStyle: 'dashed'}}>
                  <button
                    onClick={()=>{
                      let values=this.state.values;
                      if(this.state.player)
                      values[rowIndex][colIndex]='X';
                      else
                        values[rowIndex][colIndex]='O';
                      this.setState({values: values,player: !this.state.player});

                    }}
                    className="btn btn-primary btn-lg"
                    style={{padding: 15}}>{cell}</button>
                </td>);
                })}
              </tr>
              );

            })}
            </tr>
            <tr>
            <td style={{padding: '20px',borderRightStyle: 'dashed'}}>
              <button
                className="btn btn-primary btn-lg"
                style={{padding: 15}}></button>

            </td>
            <td>LOl</td></tr>

            </tbody>
          </table>
        );
    }
}

Layout.propTypes = {};

export default Layout;


