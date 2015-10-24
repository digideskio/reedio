var classnames = require('classnames');
var React = require('react');
var actions = require('../actions');
var store = require('../store');
var Youtube = require('react-youtube');

var player;

module.exports = Player = React.createClass({

  next: function() {
    actions.loadSong(store.getStore().station.sessionId);
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
        
        <Youtube
          url={'http://youtu.be/' + this.props.song.ytid}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1
            }
          }}
          onPlay={this.updateVideoState}
          onPause={this.updateVideoState}
          onEnd={this.next}
          onReady={this.assignTarget} />

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

        <div 
          className={classnames({
            'next-button': true,
            'button-disabled': this.props.loadingSong || this.props.loadingStation
          })}
          onClick={this.props.loadingSong === false ? this.next : undefined}
        >
          <i 
            className={classnames({
              'fa': true,
              'fa-forward': true,
            })}
          >
          </i>
        </div>
        
      </div>
    )
  }
});
