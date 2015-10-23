var classnames = require('classnames');
var actions = require('../actions');
var React = require('react');
var ReactSlider = require('react-slider');
var store = require('../store');
module.exports = Eq = React.createClass({

  handleChange: function(value) {

    var constraints = {};

    if (this.props.range) {
      constraints[this.props.param] = {
        min: value[0],
        max: value[1]
      };
    } else {
      constraints[this.props.param] = {
        value: value
      };
    }

    this.setState({
      constraints: constraints[this.props.param],
      hasInteracted: true
    }, function() {
      actions.loadConstraints(store.getStore().station.genre, store.getStore().station.sessionId, this.props.param, constraints);
    });
   
  },

  getInitialState: function() {

    var constraints;

    if (this.props.range) {
      constraints = {min: 0.1, max: 0.9};
    } else if (this.props.param === 'adventurousness') {
      constraints = {value: 0.2};
    } else {
      constraints = {value: 0.5}; 
    }

    return {
      constraints: constraints,
      hasInteracted: false
    };
  },

  render: function() {

    var display = {
      none: {
        display: 'none'
      }
    };

    var value = this.state.constraints.value ||
        [this.state.constraints.min, this.state.constraints.max];

    return (
      <div 
        className={classnames({
            'eq-slider': true, 
            'range': this.props.range
          })}
        style={!this.props.show ? display.none : {}}>

        <h4 className="slider-title">{this.props.title}</h4>
        
        <div className="slider-container">
          
          <ReactSlider
            min={0}
            max={1}
            step={0.05}
            minDistance={0.1}
            withBars={true}
            disabled={this.props.loading}
            value={value}
            onAfterChange={this.handleChange} />

          <div className="label min-label">{this.props.minLabel}</div>

          <div className="label max-label">{this.props.maxLabel}</div>

          <i
            className={classnames({
              'fa': true,
              'fa-check': !this.props.loading && this.state.hasInteracted,
              'fa-spinner': this.props.loading,
              'fa-pulse': this.props.loading
            })}
            key="icon"
          >
          </i>

        </div>

      </div>
    )
  }
});
