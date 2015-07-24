'use strict';

var Reflux = require('reflux');

var UIActions = Reflux.createActions({
  //from component to component directly.
  'showOverlay':{},
  'hideOverlay':{},
  'showSpinner':{},
  'hideSpinner':{}
});

module.exports = UIActions;
