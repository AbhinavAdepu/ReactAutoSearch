import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadMore } from './loadMore';
import 'bootstrap/dist/css/bootstrap.css';
export class AutoSearch extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired,
    updateLocation: PropTypes.func.isRequired,
    canAddNewRecords: PropTypes.bool.isRequired
  };
  constructor(props){
    super(props);
    this.state = {
      activeOption: 0,
      filteredOptions: this.props.options,
      userInput: '',
      count: this.props.count,
    };
  }
  
  onChange = (e) => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;
    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      userInput: e.currentTarget.innerText
    });
  };
  render() {
    const {
      onChange,
      onClick,
      state: { activeOption, filteredOptions, userInput }
    } = this;
    let optionList;
      if (filteredOptions.length) {
        optionList = (
          <div className="search-list">
            <LoadMore 
            list={filteredOptions} 
            count={5}
            updateLocation={this.props.updateLocation}
            />
          </div>
        );
      } else {
        optionList = (
          <div className="no-options">
            <div class="noContent">{this.state.userInput} Not Found</div>
            {this.props.canAddNewRecords && <button class="btn addAndSelect">Add & Select</button>}
          </div>
        );
      }
    return (
       <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            value={userInput}
          />
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

export default AutoSearch;