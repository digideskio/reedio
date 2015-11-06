var actions = require('../actions');
var classnames = require('classnames');
var PlayerButtons = require('./PlayerButtons');
var React = require('react');
var store = require('../store');
//var Youtube = require('react-youtube');
var YoutubePlayer = require('./YoutubePlayer');

var player;

var Player = React.createClass({

  next: function() {
    actions.loadSong();
  },

  assignTarget: function(e) {
    player = e.target;
    this.updateVideoState();
  },

  updateVideoState: function() {
    this.setState({videoState: player.getPlayerState()});
  },


  getInitialState: function () {
      return {
        videoState: -1
      };
  },

  render: function() {

    var youtube;

    if (this.props.loadingSong === false) {
      youtube =
        <YoutubePlayer
          ytid={this.props.song.ytid}
          opts={{autoplay: 1}} 
          onEnd={this.next}/>
        
    //     <Youtube
    //       url={'http://youtu.be/' + this.props.song.ytid}
    //       opts={{
    //         height: '100%',
    //         width: '100%',
    //         playerVars: {
    //           autoplay: 1
    //         }
    //       }}
    //       onPlay={this.updateVideoState}
    //       onPause={this.updateVideoState}
    //       onEnd={this.next}
    //       onReady={this.assignTarget} />

    } else {
      youtube = 

        <i 
          className={classnames({
            'fa': true,
            'fa-spinner': true,
            'fa-pulse': true
          })}
        >
        </i>;
    }

    return (
      <div className="player-component">
        
        <div className="player-paper">
          {youtube}
        </div>

        <PlayerButtons
          loadingStation={this.props.loadingStation}
          loadingSong={this.props.loadingSong} 
          genre={this.props.genre} 
          next={this.next}/>
        
      </div>
    )
  }
});

module.exports = Player;
