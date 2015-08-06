var fs = require('fs');
var ReactTools = require("react-tools");
require.extensions['.jsx'] = function(module, filename) {
  var content;
  content = fs.readFileSync(filename, 'utf8');
  var compiled = ReactTools.transform(content, {
    harmony: true
  });
  return module._compile(compiled, filename);
};

var origJs = require.extensions['.js'];

require.extensions['.js'] = function(module, filename) {
  // optimization: external code never needs compilation.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }
  var content = fs.readFileSync(filename, 'utf8');
  var compiled = ReactTools.transform(content, {
    harmony: true
  });
  return module._compile(compiled, filename);
};
