var _ = require('underscore');
var actions = require('../actions');
var React = require('react');
var Station = require('./Station');
var store = require('../store');

module.exports = StationList = React.createClass({

  handleTextInput: function(e) {
    e.preventDefault();
    this.setState({
      searchText: e.target.value
    });
  },

  getInitialState: function() {
    return {
      searchText: 'Search genres'
    };
  },

  render: function() {

    var stations = this.props.list;

    var color;

    if (this.state.searchText === 'Search genres') {
      color = {color: 'grey'};
    } else {
      color = {};
    }

    return (
      <div className="station-list">

        <div className="station-search">
          <i className="fa fa-search"></i>
          <form>
            <input style={color} type="search" value={this.state.searchText} onChange={this.handleTextInput} />            
          </form>
        </div>

        {
          stations.map(function(station) {
            if (station.name.match(this.state.searchText) || this.state.searchText === 'Search genres') {
              return <Station
                current={this.props.current === station.name}
                key={station.name}
                name={station.name} />
            }
          }.bind(this))
        }

      </div>
    )
  }
});
