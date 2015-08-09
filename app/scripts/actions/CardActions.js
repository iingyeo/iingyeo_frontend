'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var UIActions = require('./UIActions');

var CardActions = Reflux.createActions({
    'getCard': {
        asyncResult: true
    },
    'createCard': {
        asyncResult: true
    },
  'clear': {}
});

CardActions.getCard.preEmit = function(accessToken) {

    UIActions.showSpinner();

    new Promise((resolve, reject) => {

        console.log("get card request");

      request
        .get('http://localhost:8080/cards')
        .set('Authorization', 'Bearer ' + accessToken)
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

CardActions.createCard.preEmit = function (accessToken, text, backgroundUrl) {

    UIActions.showSpinner();

    new Promise((resolve, reject) => {

        request
            .post('http://localhost:8080/cards')
            .set('Authorization', 'Bearer ' + accessToken)
            .send({
                text: text,
                backgroundUrl: backgroundUrl
            })
            .end(function (err, res) {

                UIActions.hideSpinner();

                if (res.ok) {
                    console.log('create Card success : ' + res.text);
                    resolve(res);
                } else {
                    console.log('create Card error : ' + res.text);
                    reject(res);
                }
            });
    })
        .then(this.completed)
        .catch(this.failed);
}
module.exports = CardActions;
