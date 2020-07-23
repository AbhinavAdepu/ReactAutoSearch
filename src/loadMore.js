import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class LoadMore extends Component {
  static propTypes = {
    list: PropTypes.instanceOf(Array).isRequired,
    count: PropTypes.number.isRequired,
    updateLocation: PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    this.state = {
      list: this.props.list,
      count: this.props.count
    };
  }

  loadMore = (e) => {debugger;
    this.setState({
      count: this.state.count + this.props.count
    });
  };

  updateLocation = (e) => {
    this.props.updateLocation(e.target.innerText);
  }
  componentWillReceiveProps(props) {
    this.setState({ count: props.count })
  }
  shouldComponentUpdate(nextProps, nextState){debugger;
    if(this.props.list.length !== nextProps.list.length 
    || this.state.count !== nextState.count){
      return true;
    }
    return false;
  }

  render(){
    const { onClick } = this;debugger;
    const filteredOptions = this.props.list.slice(0, this.state.count);
    return(
      <>
        <ul className="options">
          {filteredOptions.map((optionName, index) => {
            let className;
            return (
              <li 
                className={className} 
                key={optionName} 
                onClick={this.updateLocation}>
                  {optionName}
              </li>
            );
          })}
        </ul>
        { filteredOptions.length < this.props.list.length && 
        <div className="loadMore" onClick={this.loadMore}>{this.props.count} More...</div>
       }
      </>
    )
  }
}