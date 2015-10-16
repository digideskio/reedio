var React = require('react');
var actions = require('../actions');

var App = React.createClass({

  load: function() {
    console.log('load clicked');
  },

  getInitialState: function() {
    return {};
  },

  render: function() {

    var loading = this.state.loadingStation || 'loading is undefined'

    return (
      <div>
        <p>{loading}</p>
        <p onClick={this.load}>load station button</p>
      </div>
    );

  },

});

module.exports = App;
