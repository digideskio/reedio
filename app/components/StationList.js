var _ = require('underscore');
var actions = require('../actions');
var React = require('react');
var Station = require('./Station');
var store = require('../store');

module.exports = StationList = React.createClass({

  render: function() {

    var stations = this.props.list;


    return (
      <div className="station-list">

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
