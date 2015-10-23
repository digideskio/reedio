var React = require('react');
var EqHeader = require('./EqHeader');
var EqSlider = require('./EqSlider');

module.exports = Eq = React.createClass({

  handleEqTabSelect: function(e) {
    this.setState({
      selected: e.target.title
    });
  },

  getInitialState: function() {
    return {
      selected: 'filter'
    };
  },

  render: function() {

    return (

      <div className="eq-paper">

        <EqHeader 
          selected={this.state.selected}
          select={this.handleEqTabSelect}/>
        
        <div className="eq-body">
          <EqSlider
            show={this.state.selected === 'filter'} 
            param="energy"
            title="energy"
            minLabel="calm"
            maxLabel="energetic"
            loading={this.state.loadingSteer === 'energy'}
            range={true}
          ></EqSlider>
          <EqSlider
            show={this.state.selected === 'filter'} 
            param="valence"
            title="mood"
            minLabel="sad"
            maxLabel="happy"
            loading={this.state.loadingSteer === 'valence'}
            range={true}
          ></EqSlider>
          <EqSlider
            show={this.state.selected === 'station'} 
            param="adventurousness"
            title="types of songs"
            minLabel="well-known"
            maxLabel="unknown"
            loading={this.state.loadingSteer === 'adventurousness'}
            range={false}
          ></EqSlider>
          <EqSlider
            show={this.state.selected === 'station'} 
            param="variety"
            title="variety of artists"
            minLabel="little"
            maxLabel="lots"
            loading={this.state.loadingSteer === 'variety'}
            range={false}
          ></EqSlider>
        </div>
      </div>

    )
  }
});
