var classnames = require('classnames');
var React = require('react');
var globalize = require('random-global');

var Youtube = React.createClass({

  onPlayerStateChange: function(event) {
    switch (event.data) {
    case window.YT.PlayerState.ENDED:
      this.props.onEndOrError(event);
      break;
    // case window.YT.PlayerState.PLAYING:
    //   this.props.onPlay(event);
    //   break;
    // case window.YT.PlayerState.PAUSED:
    //   this.props.onPause(event);
    //   break;
    default:
      return;
    }
  },

  onPlayerError: function(event) {
    this.props.onEndOrError(event);
  },

  componentDidMount: function() {
    var player; 
    require('youtube-iframe').load(function(YT) {
      player = new YT.Player('yt-player', {
          height: '100%',
          width: '100%',
          playerVars: this.props.opts,
          videoId: ''
      });
      this._stateChangeHandle = globalize(this.onPlayerStateChange);
      this._errorHandle = globalize(this.onPlayerError);
      player.addEventListener('onStateChange', this._stateChangeHandle);
      player.addEventListener('onError', this._errorHandle);
      
      this.props.onMount(player);
      
    }.bind(this));
  },

  render: function() {
    return <div id="yt-player"></div>
  }
});

module.exports = Youtube;
