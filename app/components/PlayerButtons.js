var classnames = require('classnames');
var React = require('react');
var actions = require('../actions');

module.exports = PlayerButtons = React.createClass({

  loadSimilar: function() {
    actions.getSimilar();
  },

  render: function() {

    return (
      <div className="player-buttons">

        <div 
          className={classnames({
            'next-button': true,
            'button-disabled': this.props.loadingSong || this.props.loadingStation
          })}
          onClick={this.props.loadingSong ? undefined: this.props.next}
        >
          <i 
            className={classnames({
              'fa': true,
              'fa-forward': true,
            })}
          >
          </i>
        </div>
        
        <div 
          className={classnames({
            'similar-button': true,
            'button-disabled': this.props.loadingStation
          })}
          onClick={this.props.loadingStation ? undefined : this.loadSimilar}
        >
          <a href="#list">
            {this.props.genre ? 'SIMILAR GENRES' : ''}
          </a>
        </div>

      </div>
    )
  }
});
