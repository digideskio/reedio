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
    actions.loadStation();
    // actions.loadList();
  },

  getInitialState: function() {
    return {
      loadingStation: true,
      loadingSong: true,
      station: {},
      list: [],
      filter: {
        search: false,
        similar: false
      },
      song: {
        ytid: ''
      }
    };
  },

  render: function() {

    return (
      <div>
        <div className="wrapper">

          <Header 
            title={this.state.station.genre ? this.state.station.genre + '.fm' : 'reedio.fm'} />

          <div className="row">

            <div className="col-6">

              <Player 
                loadingSession={this.state.loadingSession}
                loadingSong={this.state.loadingSong}
                song={this.state.song} 
                genre={this.state.station.genre} />

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
  return state.station;
};

module.exports = connect(select)(App);

/* pre redux stuff

<Eq loadingConstraint={this.state.loadingConstraint}/>

<StationList 
  current={this.state.station.genre} 
  list={this.state.list} 
  filter={this.state.filter} />

*/
