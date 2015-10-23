var _ = require('underscore');
var assign = require('object-assign');
var constants = require('./constants');
var dispatcher = require('./dispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  
  station: {
    genre: '',
    sessionId: '',
  },

  song: {
    ytid: '',
  },

  list: [],

  loadingStation: true,
  loadingSong: true,
  loadingConstraint: false

};

var updateStore = function(data) {
  _.each(data, function(value, key) {
      if (key === 'constraints') {
        _.each(data[key], function (constraints, param) {
          _store.constraints[param] = constraints;
        });
      } else {
        _store[key] = value; 
      }
  });
};

var store = assign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getStore: function(){
    return _store;
  }
});

dispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case constants.UPDATE_STORE:
      updateStore(action.data);
      store.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = store;
