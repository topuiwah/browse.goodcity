import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('package', {
  needs: ['model:item', 'model:packageType']
});

test('item relationship', function(assert) {
  var pkg = this.subject().store.modelFor('package');
  var relationship = Ember.get(pkg, 'relationshipsByName').get('item');

  assert.equal(relationship.key, 'item');
  assert.equal(relationship.kind, 'belongsTo');
});

test('packageType relationship', function(assert) {
  var pkg = this.subject().store.modelFor('package');
  var relationship = Ember.get(pkg, 'relationshipsByName').get('packageType');

  assert.equal(relationship.key, 'packageType');
  assert.equal(relationship.kind, 'belongsTo');
});

test('Valid ember-data Model', function(assert) {
  var record;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('package', {id: 1, notes: "Test"});
    record = subject.store.peekRecord('package', 1);
  });

  assert.equal(record.get('notes'), "Test");
});

test('packageName', function(assert) {
  var record, packageType;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('packageType', {id: 1, name: "Test"});
    packageType = subject.store.peekRecord('packageType', 1);

    subject.store.createRecord('package', {id: 1, notes: "Test", packageType: packageType});
    record = subject.store.peekRecord('package', 1);
  });

  assert.equal(record.get('packageName'), "Test");
});

test('dimensions', function(assert) {
  var record;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('package', {id: 1, notes: "Test", width: 10, length: 10, height: 10});
    record = subject.store.peekRecord('package', 1);
  });

  assert.equal(record.get('dimensions'), "10 x 10 x 10cm");
});
