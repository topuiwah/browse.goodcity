import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('order', {
  needs: ['model:orders_package', 'model:order_transport']
});

test('Relationship with other models', function(assert){
  assert.expect(4);

  var order = this.subject().store().modelFor('order');
  var relationshipWithOrdersPackage = Ember.get(order, 'relationshipsByName').get('ordersPackages');
  var relationshipWithOrderTransport = Ember.get(order, 'relationshipsByName').get('orderTransport');

  assert.equal(relationshipWithOrdersPackage.key, 'ordersPackages');
  assert.equal(relationshipWithOrdersPackage.kind, 'hasMany');

  assert.equal(relationshipWithOrderTransport.key, 'orderTransport');
  assert.equal(relationshipWithOrderTransport.kind, 'belongsTo');
});

test('check attributes', function(assert){
  assert.expect(5);

  var model = this.subject();

  var purposeDescription = Object.keys(model.toJSON()).indexOf('purposeDescription') > -1;
  var code = Object.keys(model.toJSON()).indexOf('code') > -1;
  var state = Object.keys(model.toJSON()).indexOf('state') > -1;
  var createdAt = Object.keys(model.toJSON()).indexOf('createdAt') > -1;
  var updatedAt = Object.keys(model.toJSON()).indexOf('updatedAt') > -1;

  assert.ok(purposeDescription);
  assert.ok(code);
  assert.ok(state);
  assert.ok(createdAt);
  assert.ok(updatedAt);
});

test('Order is valid data model', function(assert){
  assert.expect(1);

  var record;
  var user;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('user', {id: 1, firstName: 'abc' });
    user = subject.store.peekRecord('user', 1);
    subject.store.createRecord('order', {id: 1, code: "LocalOrder", createdById: 1});
    record = subject.store.peekRecord('order', 1);
  });

  assert.equal(record.get('code'), "LocalOrder");
});
