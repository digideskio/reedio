var _ = require('underscore');
var classnames = require('classnames');
var actions = require('../actions');
var React = require('react');
var Station = require('./Station');
var store = require('../store');

module.exports = StationList = React.createClass({

  handleTextInput: function(e) {
    e.preventDefault();
    this.setState({
      filterText: e.target.value
    });
  },

  handleFocus: function(e) {
    e.preventDefault();
    if (this.state.filterText === 'Search genres') {
      this.setState({
        filterText: ''
      });
    }
  },

  handleBlur: function(e) {
    e.preventDefault();
    if (this.state.searchText === '') {
      this.setState({
        filterText: 'Search genres'
      });
    }
  },

  handleShowAll: function() {
    this.setState({
      filterText: 'Search genres'
    }, function() {
      actions.loadList();
    });
  },

  findSimilar: function() {
    actions.getSimilar();
  },

  getInitialState: function() {
    return {
      filterText: 'Search genres'
    };
  },

  render: function() {

    var stations = this.props.list;

    var filtered = []; 

    for (var i = 0; i < stations.length; i++) {
      if (stations[i].name.match(this.state.filterText) || this.state.filterText === 'Search genres') {
        filtered.push(stations[i]);
      }
    }

    return (
      <div className="station-list" id="list">

        <div className={classnames({
          'station-search': true,
          'active': this.state.filterText !== 'Search genres'
        })}>
          <i className="fa fa-search"></i>
          <form>
            <input 
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleTextInput} 
              value={this.state.filterText}/>            
          </form>

          <div 
            className="filter-button"
            onClick={this.findSimilar}
            style={filtered.length > 1000 && (this.state.filterText === 'Search genres' || this.state.filterText === '') ? {} : {display: 'none'}}
          >
            similar to {this.props.current}
          </div> 

          <div 
            className="filter-button"
            onClick={this.handleShowAll}
            style={filtered.length > 1000 ? {display: 'none'} : {}}
          >
            show all genres
          </div> 
        </div>

        {
          filtered.map(function(station) {
           
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
