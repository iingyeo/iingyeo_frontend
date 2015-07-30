'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Header = require('../components/Header.jsx');

var App = React.createClass({

  render: function() {
    return (
      /* beautify preserve:start */
      <div>
        <Header />
        <div className="content">
          <RouteHandler/>
        </div>
      </div>
      /* beautify preserve:end */
    );
  }

});

module.exports = App;
