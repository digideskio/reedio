var classnames = require('classnames');
var React = require('react');

module.exports = EqHeader = React.createClass({

  render: function() {

    return (

      <div className="eq-header">

        <div 
          className={classnames({
            'eq-tab': true,
            'eq-tab-selected': this.props.selected === 'filter'
          })}
          title="filter"
          onClick={this.props.select}
        >
          FILTER SONGS
        </div>

        <div 
          className={classnames({
            'eq-tab': true,
            'eq-tab-selected': this.props.selected === 'station'
          })}
          title="station"
          onClick={this.props.select}
        >
          CUSTOMIZE STATION
        </div>

      </div>

    )
  }
});
