var JSX = require('node-jsx').install();
var React = require('react');
var App = React.createFactory(require('../../app/components/App'));
var renderToString = require('react-dom/server').renderToString;

module.exports = {

  render: function(req, res) {

    var markup = renderToString(
      App({})
    );

    res.render('app', {
      markup: markup//,
      //state: initialState
    });
  }

};
