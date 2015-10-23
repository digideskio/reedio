var React = require('react');
var classnames = require('classnames');

module.exports = Station = React.createClass({

  select: function() {
    if (!this.props.current) {
        Actions.loadStation(this.props.name);
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
