const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    https: require.resolve('https-browserify'),
    url: require.resolve('url/'),  // Add this line to polyfill 'url',
    http: require.resolve('stream-http'),
    buffer: require.resolve('buffer/')  
  };

  return config;
};