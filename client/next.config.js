module.exports = {
  // this file is loaded automatically by next when our project starts up
  // the option we're changing is to just pull all the files once every 300 seconds
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
