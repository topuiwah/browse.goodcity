import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('image', {
  needs: ['model:item']
});

test('item relationship', function(assert) {
  var image = this.subject().store.modelFor('image');
  var relationship = Ember.get(image, 'relationshipsByName').get('item');

  assert.equal(relationship.key, 'item');
  assert.equal(relationship.kind, 'belongsTo');
});

test('Valid ember-data Model', function(assert) {
  var record;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('image', {id: 1, favourite: true});
    record = subject.store.peekRecord('image', 1);
  });

  assert.equal(record.get('favourite'), true);
});
