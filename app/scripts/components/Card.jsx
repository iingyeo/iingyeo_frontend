'use strict';

var React = require('react');
var Reflux = require('reflux');

var CardStore = require('../stores/CardStore');

var test = React.createClass({
    render: function () {
    }
});

var Card = React.createClass({

    mixins: [Reflux.connect(CardStore, "cards")],

    getInitialState: function () {
        return {
            cards: CardStore.getCards()
        };
    },

    render: function () {
        var cardNodes = this.state.cards.card.map((card) => {
            var style = {
                color: 'white',
                fontSize: 50,
                height: 300,
                width: 600,
                backgroundImage: 'url(' + card.backgroundUrl + ')',
                backgroundSize: '80% 80%',
                backgroundRepeat: 'no-repeat'
            };

            return (
                <div key={card.id} style={style}>{card.text}</div>
            )
        });

        return (
            <div className="cardList">
                {cardNodes}
            </div>

        );
    }
});

module.exports = Card;