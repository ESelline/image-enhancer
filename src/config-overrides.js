// config-overrides.js
module.exports = {
    webpack: function (config) {
      config.resolve.fallback = {
        assert: require.resolve('assert/'),
        url: require.resolve('url/'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
      };
      return config;
    },
  };
  