/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'browse',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      "img-src": "'self' data: https://res.cloudinary.com",
      "style-src": "'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com",
      "font-src": "'self' data: https://maxcdn.bootstrapcdn.com",
      "object-src": "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      // Here you can pass flags/options to your application instance
      // when it is created
      NAME: 'browse.goodcity',
      CLOUD_NAME: 'ddoadcjjl',
      CLOUD_API_KEY: 926849638736153,
      CLOUD_URL: 'https://api.cloudinary.com/v1_1/ddoadcjjl/auto/upload',
      IMAGE_PATH: 'http://res.cloudinary.com/ddoadcjjl/image/upload/',
      // RESTAdapter Settings
      NAMESPACE: 'api/v1',

      PRELOAD_TYPES: ["package_type", "package_category", "donor_condition"],

      SHA: process.env.APP_SHA || "00000000",
      VERSION: "1.0.0"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // RESTAdapter Settings
    ENV.APP.API_HOST_URL = 'http://localhost:3000';

    ENV.contentSecurityPolicy["connect-src"] = [
      'http://localhost:4202',
      'http://localhost:3000',
      'https://api.cloudinary.com'
    ].join(' ');
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    // RESTAdapter Settings
    ENV.APP.API_HOST_URL = 'http://localhost:4202';
  }

  if (environment === 'production') {

    ENV.APP.API_HOST_URL = 'https://api.goodcity.hk';

    ENV.contentSecurityPolicy["connect-src"] = [
      'https://app.goodcity.hk',
      'https://api.goodcity.hk',
      'https://api.cloudinary.com'
    ].join(' ');

    if (process.env.staging === 'true') {
      ENV.staging = true;
      ENV.APP.API_HOST_URL = 'https://api-staging.goodcity.hk';

      ENV.contentSecurityPolicy["connect-src"] = [
        'https://app-staging.goodcity.hk',
        'https://api-staging.goodcity.hk',
        'https://api.cloudinary.com'
      ].join(' ');
    }
  }

  ENV.APP.SERVER_PATH  = ENV.APP.API_HOST_URL + '/' + ENV.APP.NAMESPACE;

  return ENV;
};
