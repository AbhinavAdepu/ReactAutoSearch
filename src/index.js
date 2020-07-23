import React, { Component } from 'react';
import { render } from 'react-dom';
import AutoSearch from './AutoSearch';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import options from './data';

class App extends Component {
  constructor(){
    this.state ={
      location: 'Select a location'
    }
    
  }

  updateLocation = (name) => {
    this.setState({
      location: name
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.location !== this.state.location){
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="dropdown">
        <div className="select-location-contatiner">
          <div className="btn btn-secondary dropdown-toggle btn-select-location">
            <div className="location-text">{this.state.location}</div>
          </div>
        </div>
        <div className="dropdown-list search-box-contatiner">
          <AutoSearch
            options={options}
            updateLocation={this.updateLocation}
            canAddNewRecords={true}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
