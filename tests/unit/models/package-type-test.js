import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('package-type', {
  needs: ['model:item']
});

test('item relationship', function(assert) {
  var packageType = this.subject().store.modelFor('packageType');
  var relationship = Ember.get(packageType, 'relationshipsByName').get('items');

  assert.equal(relationship.key, 'items');
  assert.equal(relationship.kind, 'hasMany');
});

test('Valid ember-data Model', function(assert) {
  var record;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('packageType', {id: 1, name: "Test"});
    record = subject.store.peekRecord('packageType', 1);
  });

  assert.equal(record.get('name'), "Test");
});
