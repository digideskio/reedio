var actions = require('../actions');
var classnames = require('classnames');
var PlayerButtons = require('./PlayerButtons');
var React = require('react');
var store = require('../store');
var Youtube = require('./Youtube');

var Player = React.createClass({

  next: function() {
    actions.loadSong();
  },

  setPlayerToState: function(player) {
    this.setState({
      player: player
    });
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.song.ytid !== this.props.song.ytid && this.props.song.ytid !== '' && this.state.player !== undefined && window) {
      this.state.player.loadVideoById(newProps.song.ytid, 0, 'small');  
    }
  },

  getInitialState: function () {
      return {
        player: undefined
      };
  },

  render: function() {

    return (
      <div className="player-component">
        
        <div className="player-paper">
          <Youtube
            ytid={this.props.song.ytid}
            opts={{autoplay: 1}} 
            onEndOrError={this.next}
            onMount={this.setPlayerToState}/>
        </div>

        <PlayerButtons
          loadingStation={this.props.loading.station}
          loadingSong={this.props.loading.song} 
          genre={this.props.genre} 
          next={this.next}/>
        
      </div>
    )
  }
});

module.exports = Player;
