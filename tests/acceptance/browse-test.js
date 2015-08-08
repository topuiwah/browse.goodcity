import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'browse/tests/helpers/start-app';

module('Acceptance | Browse Page', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test("should redirect browse page", function(assert) {
  visit("/");

  andThen(function() {
    assert.equal(currentURL(), '/browse');
  });
});
