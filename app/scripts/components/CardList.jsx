'use strict';

var React = require('react');
var Reflux = require('reflux');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var CardStore = require('../stores/CardStore');

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
      
      var url = this.state.cards.card[i].backgroundUrl;

      var style = {
        color: 'black',
        fontSize: 50,
        height: 300,
        width: 600,
        backgroundImage: url,
        backgroundSize: '80% 80%',
        backgroundRepeat: 'no-repeat'
      };

      cardNodes.push(<Card card={this.state.cards.card[i]}/>);
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
  render: function() {
    var url = this.props.card.backgroundUrl;

    var style = {
      color: 'black',
      fontSize: 50,
      height: 300,
      width: 600,
      backgroundImage: url,
      backgroundSize: '80% 80%',
      backgroundRepeat: 'no-repeat'
    };

    return (
      <Col>
        <div key={this.props.card.id} style={style}>{this.props.card.text}</div>
       </Col>
     );
  }
});

module.exports = CardList;