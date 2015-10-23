var actions = require('../actions');
var Eq = require('./Eq');
var Header = require('./Header');
var Player = require('./Player');
var React = require('react');
var StationList = require('./StationList');
var store = require('../store');

module.exports = App = React.createClass({

  _onChange: function(){
    this.setState({
      loadingStation: store.getStore().loadingStation,
      loadingSong: store.getStore().loadingSong,
      loadingConstraint: store.getStore().loadingConstraint,
      station: store.getStore().station,
      song: store.getStore().song,
      list: store.getStore().list
    });
  },

  componentDidMount: function(){
    store.addChangeListener(this._onChange);
    actions.loadStation('ambient');
  },

  componentWillUnmount: function(){
    store.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return {
      loadingStation: true,
      loadingSong: true,
      list: [],
      song: {
        ytid: ''
      }
    };
  },

  render: function() {



    return (
      <div className="wrapper">

        <Header 
          title={this.state.genre ? this.state.genre + '.fm' : 'reedio.fm'} />

        <div className="row">

          <div className="col-6">

            <Player 
              loadingSession={this.state.loadingSession}
              loadingSong={this.state.loadingSong}
              song={this.state.song} />

          </div>

          <div className="col-6">

            <Eq loadingConstraint={this.state.loadingConstraint}/>

          </div>
        
        </div>
        
        <StationList current={this.state.genre} list={this.state.list} />

      </div>
    )
  }
});




  
