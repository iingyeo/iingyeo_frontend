'use strict';

var React = require('react');
var Reflux = require('reflux');
var classnames = require('classnames');

var DomControl = require('../utils/DomControl');
var UIActions = require('../actions/UIActions');
var Register = require('../components/Register.jsx');

var Home = React.createClass({

  mixins: [
  	DomControl,
    Reflux.listenTo(UIActions.showOverlay, 'showOverlay'),
    Reflux.listenTo(UIActions.hideOverlay, 'hideOverlay')
  ],

  getInitialState: function() {

    return {
      showOverlay: false,
      overlayType: 'register'
    };

  },

  showOverlay: function(type) {
  	
    var overlay = this.refs.overlay.getDOMNode();
    overlay.addEventListener('click', this.hideOverlayListener);

    this.setState({
      overlayType: type,
      showOverlay: true
    });
  },

  hideOverlayListener: function(e) {
    if (!this.isChildNodeOf(e.target, ['overlay-content'])) {
      this.hideOverlay();
    }
  },

  hideOverlay: function() {
    this.setState({
      showOverlay: false
    });
  },

  render: function() {
  	var overlayClass = classnames({
      'md-overlay': true,
      'md-show': this.state.showOverlay
    });

    var overlayContent = null;
    if (this.state.overlayType === 'register') {
      overlayContent = <Register />;
    };

    return (
      <div>
        <h1>Iingyeo Home</h1>
        <div className={overlayClass} ref="overlay">{overlayContent}</div>
      </div>
    );
  }
  
});

module.exports = Home;
