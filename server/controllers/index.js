var JSX = require('node-jsx').install();
var React = require('react');
var App = React.createFactory(require('../../app/components/App'));

module.exports = {

  render: function(req, res) {

    // if (req.user) {
    //   console.log('user is logged in with email:', req.user.email);
    // }
    
    var markup = React.renderToString(
      App({})
    );

    res.render('app', {
      markup: markup
    });
  }

};
