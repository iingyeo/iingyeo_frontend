'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Header = require('../components/Header.jsx');

var App = React.createClass({
  
  render: function() {
    return (
      <div>
        <Header />
        <div className="content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
  
});

module.exports = App;
