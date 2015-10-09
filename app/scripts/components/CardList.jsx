'use strict';

var React = require('react');
var Reflux = require('reflux');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var CardAction = require('../actions/CardActions');
var UserStore = require('../stores/UserStore');
var CardStore = require('../stores/CardStore');
var UIActions = require('../actions/UIActions');

var CardList = React.createClass({

  mixins: [Reflux.connect(CardStore, "cards")],

  getInitialState: function() {
    return {
      cards: CardStore.getCards()
    };
  },

  render: function() {
    var cardNodes = [];

    for (var i = 0; i < this.state.cards.totalCount; i++) {

      if (typeof this.state.cards.card[i] == "undefined") {
        continue;
      }

      cardNodes.push(<Col xs={6}><Card card={this.state.cards.card[i]}/></Col>);
    }

    return (
      /* beautify preserve:start */
          <Grid>
            {cardNodes}
          </Grid>
      /* beautify preserve:end */
    );
  }
});

var Card = React.createClass({
  handleLike: function(e) {
    e.preventDefault();

    console.debug("clicked like for id : " + this.props.card.id);

    var auth = UserStore.getAuth();

    CardAction.likeCard(auth.accessToken, this.props.card.id);
  },

  render: function() {
    var url = this.props.card.backgroundUrl;

    var style = {
      color: 'black',
      fontSize: 20,
      height: 300,
      width: 500,
      backgroundImage: url,
      backgroundSize: '90% 90%',
      backgroundRepeat: 'no-repeat'
    };

    var tags = [];

    for(var i = 0; i < this.props.card.tagSet.length; i++) {
      tags.push(<span>#{this.props.card.tagSet[i]} </span>);
    }

    return (
      /* beautify preserve:start */
      <div key={this.props.card.id} style={style}>
        <div>{this.props.card.text}</div>
        <div>
          <button onClick={UIActions.showOverlay.bind(this,'childCardRegister', this.props.card.id)}>Reply({this.props.card.childCardCount})</button>
          <button onClick={this.handleLike}>Like({this.props.card.likeUserCount})</button>
        </div>
        <div>{tags}</div>
      </div>
      /* beautify preserve:end */
    );
  }
});

module.exports = CardList;