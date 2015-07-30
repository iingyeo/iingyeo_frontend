'use strict';

var React = require('react');

var NotFound = React.createClass({

  render: function() {
    return (
      /* beautify preserve:start */
      <div>
        <h1>404!</h1>
        Route not found :/
      </div>
      /* beautify preserve:end */
    );
  }

});

module.exports = NotFound;
