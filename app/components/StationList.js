var _ = require('underscore');
var classnames = require('classnames');
var actions = require('../actions');
var React = require('react');
var Station = require('./Station');
var store = require('../store');

var StationList = React.createClass({

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

  handleSubmit: function(e) {
    e.preventDefault();
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

    var message = 'If you\'re using Chrome or Safari, you may need to keep this page ' +
      'open in its own window to allow the music to play in the background. To open a new ' +
      'window and continue your browsing, hit command + N on Mac or control + N on Windows.';

    return (
      <div className="station-list" id="list">

        <span className="announcement">
          {message}
        </span>

        <div className={classnames({
          'station-search': true,
          'active': this.props.filter.search !== false
        })}>
          <i className="fa fa-search"></i>
          <form onSubmit={this.handleSubmit}> 
            <input 
              type="text"
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleTextInput}
              value={this.props.filter.search !== false ? this.props.filter.search : 'Search genres'}/>           
          </form>

          <div 
            className="filter-button"
            onClick={this.handleShowAll}
            style={this.props.filter.search === false && this.props.filter.similar === false ? {display: 'none'} : {}}
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

module.exports = StationList;
