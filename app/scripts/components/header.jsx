'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');

var Header = React.createClass({

  mixins: [Reflux.connect(UserStore, "auth")],

  getInitialState: function() {
    return {
      auth : {
        accessToken: null,
        isLoggedIn: false,
        loggedInUser: null,
      }
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var username = React.findDOMNode(this.refs.username).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();

    console.log("username : " + username + ", password : " + password);

    UserActions.login(username, password);
  },

  render: function() {
    var loginFormClass = React.addons.classSet({hidden: this.state.auth.isLoggedIn });
    var welcomeBoxClass = React.addons.classSet({hidden: !this.state.auth.isLoggedIn });

    return (
      <header className="clearfix">
        <form className={loginFormClass} onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter username" ref="username" />
          <input type="password" placeholder="Enter password" ref="password" />
          <button type="submit">Sign in</button>
        </form>
        <span className={welcomeBoxClass}>Hello, {this.state.auth.loggedInUser}! Welcome to Iingyeo!</span>
      </header>
    );
  }

});

module.exports = Header;
