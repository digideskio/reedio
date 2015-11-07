var React = require('react');

var Footer = React.createClass({

  render: function() {

    return (
      <div className="footer">
        <a href="mailto:reedio.fm@gmail.com" className="contact">Contact & Feedback</a>
        <div className="copyright">© 2015 Kurt Weiberth</div>
      </div>
    )
  }
});

module.exports = Footer;
