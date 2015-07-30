'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var UserActions = require('../actions/UserActions');

var CardRegister = React.createClass({
  registerAccount: function(e) {

    e.preventDefault();

  },

  render: function() {
    return (
      /* beautify preserve:start */
      <div className="md-modal" id="overlay-content">
        <form className="register-form text-left">
          <h1>Register</h1>

        </form>
      </div>
      /* beautify preserve:end */
    );
  }
});

module.exports = CardRegister;
