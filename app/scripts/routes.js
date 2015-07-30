'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./pages/app.jsx');
var Home = require('./pages/home.jsx');
var NotFound = require('./pages/notFound.jsx');

var routes = (
  /* beautify preserve:start */
  <Route name="app" path="/" handler={ App }>
    <Route name="home" handler={ Home } />
    <DefaultRoute handler={ Home } />
    <NotFoundRoute handler={ NotFound } />
  </Route>
  /* beautify preserve:end */
);

module.exports = routes;
