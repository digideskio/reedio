var actions = require('../actions');
var Eq = require('./Eq');
var Footer = require('./Footer');
var Header = require('./Header');
var Player = require('./Player');
var React = require('react');
var StationList = require('./StationList');
var store = require('../store');

var App = React.createClass({

  handleExtensionConstraint: function(counts) {
    if (counts.positive >= counts.negative) {
      console.log('more positive');
      actions.loadConstraints({
        energy: {
          min: 0.8,
          max: 1.0
        },
        valence: {
          min: 0.8,
          max: 1.0
        }
      });
    } else {
      console.log('more negative');

      actions.loadConstraints({
        energy: {
          min: 0.0,
          max: 0.2
        },
        valence: {
          min: 0.0,
          max: 0.2
        }
      });
    }
  },

  _onChange: function(){
    this.setState({
      loadingStation: store.getStore().loadingStation,
      loadingSong: store.getStore().loadingSong,
      loadingConstraint: store.getStore().loadingConstraint,
      station: store.getStore().station,
      song: store.getStore().song,
      list: store.getStore().list,
      filter: store.getStore().filter
    });
  },

  handleYoutubeMount: function() {
    actions.loadStation();
  },

  componentDidMount: function(){
    store.addChangeListener(this._onChange);
    actions.loadList();
    
    var extensionId = "idhcnfdmjkohpcchfggkfmbpebojmeoe";

    chrome.runtime.sendMessage(extensionId, {test: "hey there"}, function(response) {
      if (response) {
        console.log(response);
      }
    });

    var port = chrome.runtime.connect(extensionId);

    port.onMessage.addListener(function(msg) {
      console.log(msg);
      if (msg.counts) {
        this.handleExtensionConstraint(msg.counts);
      }
    }.bind(this));

    this.setState({
      port: port
    });
  },

  componentWillUnmount: function(){
    store.removeChangeListener(this._onChange);
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
                genre={this.state.station.genre} 
                onYoutubeMount={this.handleYoutubeMount} />

            </div>

            <div className="col-6">

              <Eq loadingConstraint={this.state.loadingConstraint}/>

            </div>
          
          </div>
          
          <StationList 
            current={this.state.station.genre} 
            list={this.state.list} 
            filter={this.state.filter} />

        </div>

        <Footer />
        
      </div>
    )
  }
});

module.exports = App;
