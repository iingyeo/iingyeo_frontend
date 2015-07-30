'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var classnames = require('classnames');

var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');
var UIActions = require('../actions/UIActions');

var Header = React.createClass({

  mixins: [Reflux.connect(UserStore, "auth")],

  getInitialState: function() {
    return {
      auth: UserStore.getAuth()
    };
  },

  handleLogin: function(e) {
    e.preventDefault();

    var username = React.findDOMNode(this.refs.username).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();

    console.log("username : " + username + ", password : " + password);

    React.findDOMNode(this.refs.username).value = '';
    React.findDOMNode(this.refs.password).value = '';

    UserActions.login(username, password);
  },

  handleLogout: function(e) {
    e.preventDefault();

    UserActions.logout(this.state.auth.accessToken);
  },

  render: function() {
    var loginFormClass = classnames({
      hidden: this.state.auth.isLoggedIn
    });
    var welcomeBoxClass = classnames({
      hidden: !this.state.auth.isLoggedIn
    });

    return (
      /* beautify preserve:start */
      <header className="clearfix">
        <Grid>

          <Row className={loginFormClass}>

            <Col xs={15} md={10}>
              <form onSubmit={this.handleLogin}>
                <input type="text" placeholder="Enter username" ref="username"/>
                <input type="password" placeholder="Enter password" ref="password"/>
                <button type="submit">Sign in</button>
              </form>
            </Col>

            <Col xs={3} md={2}>
              <button onClick={UIActions.showOverlay.bind(this,'register')}>
                Register
              </button>
            </Col>
          </Row>

          <Row className={welcomeBoxClass}>
            <Col xs={12} md={8}>
              <div>
                Hello, {this.state.auth.user.username}! Welcome to Iingyeo!&nbsp;&nbsp;
              </div>
            </Col>

            <Col xs={3} md={2}>
              <button onClick={this.handleLogout}>New Card</button>
            </Col>

            <Col xs={3} md={2}>
              <button onClick={this.handleLogout}>Sign out</button>
            </Col>
          </Row>
        </Grid>
      </header>
      /* beautify preserve:end */
    );
  }

});

module.exports = Header;
