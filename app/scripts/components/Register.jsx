'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var UserActions = require('../actions/UserActions');

var Register = React.createClass({
  registerAccount: function(e) {
    e.preventDefault();

    var username = React.findDOMNode(this.refs.username).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    var confirmPassword = React.findDOMNode(this.refs.confirmPassword).value.trim();

    console.log("username : " + username + ", password : " + password + ", confirm password : " + confirmPassword);

    if (password !== confirmPassword) {
      alert("Check your password!");
      return;
    }

    React.findDOMNode(this.refs.username).value = '';
    React.findDOMNode(this.refs.password).value = '';
    React.findDOMNode(this.refs.confirmPassword).value = '';

    UserActions.register(username, password);
  },

  render: function() {
    return (
      /* beautify preserve:start */
      <div className="md-modal" id="overlay-content">
        <form className="register-form text-left">
          <h1>Register</h1>
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" ref="username" /><br /><br />
          <label htmlFor="password">Passoword</label><br />
          <input type="password" name="password" ref="password" /><br /><br />
          <label htmlFor="username">Confirm Password</label><br />
          <input type="password" name="confirmPassword" ref="confirmPassword" /><br /><br />
          <button onClick={this.registerAccount}>Register</button><br /><br />
        </form>
      </div>
      /* beautify preserve:end */
    );
  }
});

module.exports = Register;
