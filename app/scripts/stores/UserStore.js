'use strict';

var Reflux = require('reflux');

var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({

  listenables: [UserActions],

  onLoginCompleted: function(response) {
    console.log("access token : " + response.body.access_token);

    UserActions.getUser(response.body.access_token);
  },

  onLoginFailed: function(response) {
    // handle login failed
  },

  onGetUserCompleted: function(response, accessToken) {
    console.log("loggedInUser : " + response.body.name);

    this.trigger({
      accessToken: accessToken,
      isLoggedIn: true,
      loggedInUser: response.body.name
    });
  },

  onGetUserFailed: function(response) {
    // handle get user failed
  }


});

module.exports = UserStore;
