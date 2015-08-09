'use strict';

var Reflux = require('reflux');

var CardActions = require('../actions/CardActions');

var CardStore = Reflux.createStore({

  listenables: [CardActions],

  init: function() {
    this.cards = {
      totalPage: null,
      totalCount: null,
      pageNum: null,
      card: [{
        id: null,
        userId: null,
        text: null,
        backgroundUrl: null
      }]
    };
  },

  getCards: function() {
    return this.cards;
  },

  updateCards: function(cards) {
    this.cards = cards;
    this.trigger(cards);
  },

  clear: function() {
    console.log("clear card list");

    this.cards.card = [{}];
    this.trigger(this.cards);
  },

  onGetCardCompleted: function(response) {
    console.log("get card count : " + response.body.cards.length);

    this.updateCards({
      totalPage: response.body.totalPage,
      totalCount: response.body.totalCount,
      pageNum: response.body.pageNum,
      card: response.body.cards
    });
  },

  onGetCardFailed: function(response) {}
});

module.exports = CardStore;
