var React = require('react');

var Header = React.createClass({

  render: function() {

    return (
      <div className="header">

        <span className="title">

          <span className="title-text">{this.props.title}</span>

        </span>

      </div>
    )
  }
});

module.exports = Header;
