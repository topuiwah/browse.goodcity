import { test, moduleFor } from 'ember-qunit';
import startApp from '../helpers/start-app';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import Ember from 'ember';

var App;

moduleFor('controller:cart', 'cart controller', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
  },
  afterEach: function() {
    Ember.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test('calling displayCart transition to route "/" ', function(assert) {
  assert.expect(1);

  // get the controller instance
  var ctrl = this.subject();

  ctrl.send('displayCart');

  assert.equal(currentPath(), "/");
});

