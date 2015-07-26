'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var UIActions = require('./UIActions');

var UserActions = Reflux.createActions({
  'login': { asyncResult: true },
  'getUser': { asyncResult: true },
  'logout': { asyncResult: true },
  'register': { asyncResult: true }
});

UserActions.login.preEmit = function(username, password) {

  UIActions.showSpinner();

  new Promise((resolve, reject) => {

    console.log("send login request");

    if (!username || !password) {
      return;
    }

    var clientId = 'iingyeo';
    var secret = '1234';

    request
        .post('http://localhost:8080/oauth/token')
        .auth(clientId, secret)
        .send('grant_type=password')
        .send('scope=read write')
        .send('username=' + username)
        .send('password=' + password)
        .end(function (err, res) {

          UIActions.hideSpinner();

          if (res.ok) {
            console.log('login success : ' + res.text);
            resolve(res);
          } else {
            console.log('login error : ' + res.text);
            reject(res);
          }
        });
  })
      .then(this.completed)
      .catch(this.failed);

};

UserActions.getUser.preEmit = function(accessToken) {

  UIActions.showSpinner();

  new Promise((resolve, reject) => {

    console.log("send get user request");

    request
        .get('http://localhost:8080/user')
        .set('Authorization', 'Bearer ' + accessToken)
        .end(function (err, res) {
          if (res.ok) {
            console.log('get user success : ' + res.text);

            UIActions.hideSpinner();

            resolve(res);
          } else {
            console.log('get user error : ' + res.text);
            reject(res);
          }
        });
  })
      .then(this.completed)
      .catch(this.failed);

};

UserActions.logout.preEmit = function(accessToken) {

  UIActions.showSpinner();

  new Promise((resolve, reject) => {

    console.log("send logout request by access token : " + accessToken);

    request
        .post('http://localhost:8080/user/logout')
        .set('Authorization', 'Bearer ' + accessToken)
        .end(function (err, res) {
          UIActions.hideSpinner();

          if (res.ok) {
            console.log('logout success : ' + res.text);
            resolve(res);
          } else {
            console.log('logout error : ' + res.text);
            reject(res);
          }
        });
  })
      .then(this.completed)
      .catch(this.failed);

};

UserActions.register.preEmit = function(username, password) {

  UIActions.showSpinner();

  new Promise((resolve, reject) => {

    console.log("send register request");

    if (!username || !password) {
      return;
    }

    request
        .post('http://localhost:8080/users')
        .send({ username: username, password: password })
        .end(function (err, res) {
          UIActions.hideSpinner();

          if (res.ok) {
            console.log('register success : ' + res.text);
            resolve(res);
          } else {
            console.log('register error : ' + res.text);
            reject(res);
          }
        });
  })
      .then(this.completed)
      .catch(this.failed);

};

module.exports = UserActions;