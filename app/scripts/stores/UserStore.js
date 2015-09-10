'use strict';

var Reflux = require('reflux');
var cookie = require('cookie');

var UserActions = require('../actions/UserActions');
var UIActions = require('../actions/UIActions');
var CardActions = require('../actions/CardActions');

var UserStore = Reflux.createStore({

  listenables: [UserActions],

  init: function() {
    this.auth = {
      accessToken: null,
      isLoggedIn: false,
      user: {
        id: null,
        username: null,
        created: null,
        updated: null
      }
    };
  },

  getAuth: function() {
    console.log("auth info : " + this.auth);

    var cookies = cookie.parse(document.cookie);
    console.log("access token in the cookie : " + cookies.accessToken);

    if (cookies.accessToken && !this.auth.accessToken) {
      this.updateAuth({
        accessToken: cookies.accessToken,
        isLoggedIn: false,
        user: {
          id: null,
          username: null,
          created: null,
          updated: null
        }
      });

      UserActions.getUser(cookies.accessToken);
      CardActions.getCard(cookies.accessToken);
    }

    return this.auth;
  },

  updateAuth: function(auth) {
    this.auth = auth;

    this.trigger(auth);
  },

  onLoginCompleted: function(response) {
    console.log("access token : " + response.body.access_token);

    var today = new Date();

    // Set expire date for cookie for 1 day
    var endDate = new Date(today.getTime() + (1000 * 60 * 60 * 24));

    document.cookie = cookie.serialize('accessToken', response.body.access_token, {
      expires: endDate
    });

    this.updateAuth({
      accessToken: response.body.access_token,
      isLoggedIn: false,
      user: {
        id: null,
        username: null,
        created: null,
        updated: null
      }
    });

    UserActions.getUser(response.body.access_token);
    CardActions.getCard(response.body.access_token);
  },

  onLoginFailed: function(response) {
    // handle login failed
  },

  onGetUserCompleted: function(response) {
    var accessToken = this.auth.accessToken;

    console.log("loggedInUser : " + response.body.username);

    this.updateAuth({
      accessToken: accessToken,
      isLoggedIn: true,
      user: response.body
    });
  },

  onGetUserFailed: function(response) {
    // handle get user failed
  },

  onLogoutCompleted: function(response) {
    console.log("logout result : " + response.body);

    var today = new Date();

    // Set expire date to remove cookie
    var endDate = new Date(today.getTime() - (1000 * 60 * 60 * 24));

    document.cookie = cookie.serialize('accessToken', "", {
      expires: endDate
    });

    CardActions.clear();

    if (response.body) {
      this.updateAuth({
        accessToken: null,
        isLoggedIn: false,
        user: {
          id: null,
          username: null,
          created: null,
          updated: null
        }
      });
    } else {
      console.log("logout failed");
    }
  },

  onLogoutFailed: function(response) {
    // handle logout failed
  },

  onRegisterCompleted: function(response) {
    console.log("register result : " + response.text);

    UIActions.hideOverlay();
  },

  onRegisterFailed: function(response) {
    // handle register failed
  }

});

module.exports = UserStore;
