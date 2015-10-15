var React = require('react');

module.exports = App = React.createClass({

  getInitialState: function() {
    return {
      loadingSession: true
    };
  },

  render: function() {
    return (
      <div className="wrapper">
        hella cool
      </div>
    )
  }
});
