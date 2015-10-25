var _ = require('underscore');
var classnames = require('classnames');
var actions = require('../actions');
var React = require('react');
var Station = require('./Station');
var store = require('../store');

module.exports = StationList = React.createClass({

  handleTextInput: function(e) {
    e.preventDefault();
    actions.updateSearchText(e.target.value);
  },

  handleFocus: function(e) {
    e.preventDefault();
    actions.updateSearchText('');
  },

  handleBlur: function(e) {
    e.preventDefault();
    if (e.target.value === '') {
      actions.updateSearchText(false);
    }
  },

  handleShowAll: function() {
    actions.removeFilters();
  },

  filterStations: function() {

    var stations = this.props.filter.similar || this.props.list;

    var filtered = [];

    if (this.props.filter.search) {
      var search = this.props.filter.search;
      for (var i = 0; i < stations.length; i++) {
        if (stations[i].name.match(search)) {
          filtered.push(stations[i]);
        }
      }
    } else {
      filtered = stations;
    }
    return filtered;
  },

  render: function() {

    var stations = this.filterStations(); 

    return (
      <div className="station-list" id="list">

        <div className={classnames({
          'station-search': true,
          'active': this.props.filter.search !== false
        })}>
          <i className="fa fa-search"></i>
          <form>
            <input 
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleTextInput} 
              value={this.props.filter.search !== false ? this.props.filter.search : 'Search genres'}/>            
          </form>

          <div 
            className="filter-button"
            onClick={this.handleShowAll}
            style={stations.length > 1300 ? {display: 'none'} : {}}
          >
            show all genres
          </div> 
        </div>

        {
          stations.map(function(station) {
           
            return <Station
              current={this.props.current === station.name}
              key={station.name}
              name={station.name} />
            
          }.bind(this))
        }

      </div>
    )
  }
});
