// var Eq = require('./Eq');
var Footer = require('./Footer');
var Header = require('./Header');
var Player = require('./Player');
var React = require('react');
// var StationList = require('./StationList');
var connect = require('react-redux').connect;
var actions = require('../../redux-actions');

var App = React.createClass({

  componentDidMount: function(){
    this.props.dispatch(actions.loadStation());
    // actions.loadList();
  },

  // getInitialState: function() {
  //   return {
  //     loadingStation: true,
  //     loadingSong: true,
  //     station: {},
  //     list: [],
  //     filter: {
  //       search: false,
  //       similar: false
  //     },
  //     song: {
  //       ytid: ''
  //     }
  //   };
  // },

  render: function() {

    return (
      <div>
        <div className="wrapper">

          <Header 
            title={this.props.station.genre ? this.props.station.genre + '.fm' : 'reedio.fm'} />

          <div className="row">

            <div className="col-6">

              <Player 
                loading={this.props.loading}
                song={this.props.song} 
                genre={this.props.station.genre} />

            </div>

            <div className="col-6">


            </div>
          
          </div>

        </div>

        <Footer />
        
      </div>
    )
  }
});

var select = function(state) {
  return state;
};

module.exports = connect(select)(App);

/* pre redux stuff

<Eq loadingConstraint={this.state.loadingConstraint}/>

<StationList 
  current={this.state.station.genre} 
  list={this.state.list} 
  filter={this.state.filter} />

*/
