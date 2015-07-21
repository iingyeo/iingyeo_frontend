'use strict';

var Reflux = require('reflux');

var UserActions = require('../actions/UserActions');
var UIActions = require('../actions/UIActions');

var UserStore = Reflux.createStore({

  listenables: [UserActions],

  onLoginCompleted: function(response) {
    console.log("access token : " + response.body.access_token);

    UserActions.getUser(response.body.access_token);
  },

  onLoginFailed: function(response) {
    // handle login failed
  },

  onGetUserCompleted: function(responseObj) {
    var response = responseObj.response;
    var accessToken = responseObj.accessToken;

    console.log("loggedInUser : " + response.body.name);

    this.trigger({
      accessToken: accessToken,
      isLoggedIn: true,
      loggedInUser: response.body.name
    });
  },

  onGetUserFailed: function(response) {
    // handle get user failed
  },

  onLogoutCompleted: function(response) {
    console.log("logout result : " + response.body);

    if(response.body) {
      this.trigger({
        accessToken: null,
        isLoggedIn: false,
        loggedInUser: null
      });
    } else {
      console.log("logout failed");  
    }
  },

  onLogoutFailed: function(response) {
    // handle logout failed
  },

  onRegisterCompleted: function(response) {
    console.log("register result : " + JSON.stringify(response.body));

    UIActions.hideOverlay();
  },

  onRegisterFailed: function(response) {
    // handle register failed
  }


});

module.exports = UserStore;
