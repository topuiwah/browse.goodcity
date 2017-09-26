import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('user', 'user model',{
  need:[]
});

test('check attributes', function(assert){
  var model = this.subject();
  var firstName = Object.keys(model.toJSON()).indexOf('firstName') > -1;
  var lastName = Object.keys(model.toJSON()).indexOf('lastName') > -1;
  var createdAt = Object.keys(model.toJSON()).indexOf('createdAt') > -1;
  var mobile = Object.keys(model.toJSON()).indexOf('mobile') > -1;

  assert.ok(firstName);
  assert.ok(lastName);
  assert.ok(createdAt);
  assert.ok(mobile);
});

test('check mobileWithoutCountryCode computedProperty', function(assert){
  assert.expect(1);
  var model = this.subject();
  Ember.run(function() {
    model.set('mobile', '+852511111');
  });

  assert.equal(model.get('mobileWithoutCountryCode'), '511111');
});

test('check fullName computedProperty', function(assert){
  assert.expect(1);
  var model = this.subject();
  Ember.run(function() {
    model.set('firstName', 'David');
    model.set('lastName', 'Dara');
  });

  assert.equal(model.get('fullName'), 'David Dara');
});
