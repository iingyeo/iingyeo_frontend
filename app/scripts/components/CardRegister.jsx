'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var CardAction = require('../actions/CardActions');
var UserStore = require('../stores/UserStore');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var Modal = require('react-bootstrap').Modal;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var CardRegister = React.createClass({
    registerCard: function (e) {
        e.preventDefault();

        var text = React.findDOMNode(this.refs.text).value;
        var backgroundUrl = React.findDOMNode(this.refs.backgroundUrl).style.backgroundImage;
        console.log("Input Text :" + text);
        console.log("Input BackgroundUrl :" + backgroundUrl);

        React.findDOMNode(this.refs.text).value = '';

        var auth = UserStore.getAuth();

        CardAction.createCard(auth.accessToken, text, backgroundUrl);
    },

    render: function () {
        return (

            <div className="md-card-modal" id="overlay-content">
                <table>
                    <thead>
                    <tr>
                        <td>
                            <h3>Register Card</h3>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <div
                                style={{width:550,height:300,backgroundImage:'url(https://pbs.twimg.com/media/BiFpKzoCEAIom0u.jpg)'}}
                                ref="backgroundUrl">
                                <textarea className="md-card-input" ref="text">
                                </textarea>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <ButtonToolbar>
                                <Button>Create</Button>
                                <Button onClick={this.registerCard} bsStyle='primary'>Create</Button>
                            </ButtonToolbar>

                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
});

module.exports = CardRegister;
