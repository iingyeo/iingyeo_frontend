'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({

  listenables: [UserActions],

  onLogin: function(username, password) {
    console.log("send login request");

    if (!username || !password) {
      return;
    }

    var clientId = 'iingyeo';
    var secret = '1234';

    request
      .post('http://localhost:8080/oauth/token')
      .withCredentials()
      .auth(clientId, secret)
      .send('grant_type=password')
      .send('scope=read write')
      .send('username=' + username)
      .send('password=' + password)
      .end(function (err, res) {
        if (res.ok) {
          console.log('access token : ' + res.body.access_token);

          var accessToken = res.body.access_token;

          request
            .get('http://localhost:8080/user')
            .set('Authorization', 'Bearer ' + accessToken)
            .end(function (err, res) {
              if (res.ok) {
                console.log('response : ' + JSON.stringify(res.body));
                console.log("loggedInUser : " + res.body.name);

                this.trigger({
                  accessToken: accessToken,
                  isLoggedIn: true,
                  loggedInUser: res.body.name
                });
              } else {
                console.log('getLoggedInUser error : ' + res.text);
              }
            }.bind(this));
        } else {
          console.log('login error : ' + res.text);
        }
    }.bind(this));
    
  }

});

module.exports = UserStore;