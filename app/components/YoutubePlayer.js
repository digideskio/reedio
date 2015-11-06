var classnames = require('classnames');
var React = require('react');
var globalize = require('random-global');

var YoutubePlayer = React.createClass({

  onPlayerStateChange: function(event) {
    switch (event.data) {
    case window.YT.PlayerState.ENDED:
      this.props.onEnd(event);
      break;
    // // case window.YT.PlayerState.PLAYING:
    // //   this.props.onPlay(event);
    // //   break;
    // // case window.YT.PlayerState.PAUSED:
    // //   this.props.onPause(event);
    //   // break;
    default:
      return;
    }
  },

  componentWillUpdate: function(newProps) {
    // console.log(newProps);
    
    if (this.state.player !== undefined) {
      this.state.player.loadVideoById(newProps.ytid, 0, 'small');
    }
  },

  componentDidMount: function() {
    var player; 
    require('youtube-iframe').load(function(YT) {
      player = new YT.Player('yt-player', {
          height: '100%',
          width: '100%',
          playerVars: this.props.opts,
          videoId: this.props.ytid
      });
      this._stateChangeHandle = globalize(this.onPlayerStateChange);
      player.addEventListener('onStateChange', this._stateChangeHandle);
      
      this.setState({
        player: player
      });
    }.bind(this));
  },

  getInitialState: function () {
    return {
      player: undefined
    };
  },

  render: function() {
    return <div id="yt-player"></div>
  }
});

module.exports = YoutubePlayer;
