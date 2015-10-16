var $ = require('jquery');
var React = require('react');
var actions = require('../actions');
var Infinite = require('react-infinite/build/react-infinite');
var store = require('../store');

var App = React.createClass({

  load: function() {
    actions.loadStation('ambient');
  },

  _onChange: function(){
    this.setState({
      loadingStation: store.getStore().loadingStation,
      loadingSong: store.getStore().loadingSong,
      loadingConstraint: store.getStore().loadingConstraint,
      station: store.getStore().station,
      song: store.getStore().song,
      constraints: store.getStore().constraints
    });
  },

  componentDidMount: function(){
    store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    store.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return {
      loadingStation: 'intital',
      loadingSong: 'initial',
      loadingConstraint: 'initial'
    };
  },

  loadList: function() {
    $.ajax({
      url: 'http://developer.echonest.com/api/v4/artist/list_genres',
      data: {
        api_key: 'GXGRUF801QIA0UOX0',
        format: 'json'
      },
      error: function(err) {
        console.log('Encountered error in ajax list stations');
        console.log('Error:', err);
      },
      success: function(res) {
        this.setState({
          list: res.response.genres
        });
      }.bind(this)
    });
  },

  render: function() {

    var loadingStation = 'loading station: ' + this.state.loadingStation;
    var loadingSong = 'loading song: ' + this.state.loadingSong;
    var loadingConstraint = 'loading constraint: ' + this.state.loadingConstraint;
    var genre = this.state.station ? this.state.station.genre : 'station.genre: undefined';
    var sessionId = this.state.station ? this.state.station.sessionId : 'station.sessionId: undefined';
    var song = this.state.song ? this.state.song.ytid : 'song.ytid: undefined';
    var constraints = this.state.constraints ? this.state.constraints.energy.min : 'constraints are undefined'; 

    var stations = this.state.list || ['initial'];

    return (
      <div>
        <p>{loadingStation}</p>
        <p>{loadingSong}</p>
        <p>{loadingConstraint}</p>
        <p>{genre}</p>
        <p>{sessionId}</p>
        <p>{song}</p>
        <p>{constraints}</p>
        <p onClick={this.load}>load station button</p>
        <p onClick={this.loadList}>load list button</p>
        <Infinite style={{border: '1px solid black'}} containerHeight={200} elementHeight={30} infiniteLoadBeginBottomOffset={10}>
          {
            stations.map(function(station) {
              return <div>{station.name}</div>;
            })
          }
        </Infinite>
      </div>
    );

  },

});

module.exports = App;
