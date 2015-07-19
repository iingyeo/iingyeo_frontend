'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var UserActions = Reflux.createActions({
  'login': { asyncResult: true },
  'getUser': { asyncResult: true },
  'logout': { asyncResult: true}
});

UserActions.login.preEmit = function(username, password) {

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

	new Promise((resolve, reject) => {
		console.log("send get user request");

    	request
            .get('http://localhost:8080/user')
            .set('Authorization', 'Bearer ' + accessToken)
            .end(function (err, res) {
              if (res.ok) {
                console.log('get user success : ' + res.text);

                resolve({
                  response: res,
                  accessToken: accessToken
                });
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

  new Promise((resolve, reject) => {
    console.log("send logout request by access token : " + accessToken);

      request
            .post('http://localhost:8080/user/logout')
            .set('Authorization', 'Bearer ' + accessToken)
            .end(function (err, res) {
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

module.exports = UserActions;
