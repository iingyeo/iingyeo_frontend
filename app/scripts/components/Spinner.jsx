'use strict';

var React = require('react');

var Spinner = React.createClass({

  render: function() {
    var bars = [];
    var barStyle;

    for (var i = 0; i < 12; i++) {
      barStyle = {};
      barStyle.WebkitAnimationDelay = barStyle.animationDelay =
        (i - 12) / 10 + 's';
      barStyle.WebkitTransform = barStyle.transform =
        'rotate(' + (i * 30) + 'deg) translate(146%)';
      bars.push(
        /* beautify preserve:start */
        <div style={ barStyle } className="react-spinner_bar" key={ i } />
        /* beautify preserve:end */
      );
    }

    return (
      /* beautify preserve:start */
      <div { ...this.props } className="react-spinner">
                { bars }
      </div>
      /* beautify preserve:end */

    );
  }
});

module.exports = Spinner;
