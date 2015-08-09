'use strict';

var React = require('react');
var Reflux = require('reflux');
var classnames = require('classnames');

var DomControl = require('../utils/DomControl');
var UIActions = require('../actions/UIActions');

var Register = require('../components/Register.jsx');
var Spinner = require('../components/Spinner.jsx');
var Card = require('../components/CardList.jsx');
var CardRegister = require('../components/CardRegister.jsx');

var Home = React.createClass({

  mixins: [
    DomControl,
    Reflux.listenTo(UIActions.showOverlay, 'showOverlay'),
    Reflux.listenTo(UIActions.hideOverlay, 'hideOverlay'),
    Reflux.listenTo(UIActions.showSpinner, 'showSpinner'),
    Reflux.listenTo(UIActions.hideSpinner, 'hideSpinner')
  ],

  getInitialState: function() {

    return {
      showOverlay: false,
      overlayType: 'register',
      showSpinner: false
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

  showSpinner: function() {
    console.log('call showSpinner');

    this.setState({
      showSpinner: true
    });
  },

  hideSpinner: function() {
    console.log('call hideSpinner');

    this.setState({
      showSpinner: false
    });
  },

  render: function() {
    var overlayClass = classnames({
      'md-overlay': true,
      'md-show': this.state.showOverlay
    });

    var overlayContent = null;

    if (this.state.overlayType === 'register') {
      overlayContent = < Register />;
    } else if (this.state.overlayType === 'cardRegister') {
      overlayContent = < CardRegister /> ;
    }

    return (
      /* beautify preserve:start */
      <div>
        { this.state.showSpinner ? <Spinner /> : null }
        <h1>Iingyeo Home</h1>

        <div className={overlayClass} ref="overlay">{overlayContent}</div>
        <div><Card /></div>
      </div>
      /* beautify preserve:end */
    );
  }

});

module.exports = Home;
