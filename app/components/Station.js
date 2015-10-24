var React = require('react');
var classnames = require('classnames');
var actions = require('../actions');

module.exports = Station = React.createClass({

  select: function() {
    if (!this.props.current) {
        actions.loadStation(this.props.name);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
     }
  },

  render: function() {

    return (
      <div 
        className={classnames({
          'station': true,
          'station-selected': this.props.current
        })}
        onClick={this.select}
      >
        
        {this.props.name}

      </div>
    )
  }
});
