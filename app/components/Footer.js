var React = require('react');

module.exports = Footer = React.createClass({

  render: function() {

    return (
      <div className="footer">
        <a className="contact">Contact & Feedback</a>
        <div className="copyright">© 2015 Kurt Weiberth</div>
      </div>
    )
  }
});
