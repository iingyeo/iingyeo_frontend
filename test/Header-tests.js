require('../test-utils/testdom')('<html><body></body></html>');

var React = require('react');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var reactStub = require('../test-utils/reactStub');

chai.use(require('sinon-chai'));

describe('Header', function() {
  var React;
  var TestUtils;
  var Header;
  var element;

  beforeEach(function() {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;

    Header = proxyquire(process.cwd() + '/app/scripts/components/Header.jsx', {});

    element = TestUtils.renderIntoDocument(
      /* beautify preserve:start */
      <Header />
      /* beautify preserve:end */
    );
  });

  it('should render className as clearfix', function() {
    expect(React.findDOMNode(element).className).to.eql('clearfix');
  });

});
