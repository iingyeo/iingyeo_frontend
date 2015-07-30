'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var UIActions = require('./UIActions');

var CardActions = Reflux.createActions({
  'getCard': {
    asyncResult: true
  }
});

CardActions.getCard.preEmit = function() {

  UIActions.showSpinner();

  new Promise((resolve, reject) => {

      console.log("get card request");

      request
        .get('http://localhost:8080/cards')
        .end(function(err, res) {

          UIActions.hideSpinner();

          if (res.ok) {
            console.log('get card success : ' + res.text);
            resolve(res);
          } else {
            console.log('get card error : ' + res.text);
            reject(res);
          }
        });
    })
    .then(this.completed)
    .catch(this.failed);
};

module.exports = CardActions;
