import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('donorCondition', {
  needs: ['model:item']
});

test('item relationship', function(assert) {
  var donorCondition = this.subject().store.modelFor('donorCondition');
  var relationship = Ember.get(donorCondition, 'relationshipsByName').get('items');

  assert.equal(relationship.key, 'items');
  assert.equal(relationship.kind, 'hasMany');
});

test('Valid ember-data Model', function(assert) {
  var record;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('donorCondition', {id: 1, name: "Test"});
    record = subject.store.peekRecord('donorCondition', 1);
  });

  assert.equal(record.get('name'), "Test");
});
