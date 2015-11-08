var JSX = require('node-jsx').install();
var React = require('react');
var Provider = require('react-redux').Provider;
var App = React.createFactory(require('../../shared/components/App'));
var renderToString = require('react-dom/server').renderToString;

module.exports = {

  render: function(req, res) {

    var store =  require('../../redux-store')();

    var markup = renderToString(

      React.createElement(
        Provider, {store: store}, React.createElement(App, {})
      )

      // <Provider store={store}>
      //   <App />
      // </Provider>
    );

    res.render('app', {
      markup: markup//,
      //state: initialState
    });
  }

};
