import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('item', {
  needs: ['model:package', 'model:image', 'model:donor-condition',
    'model:package-type', 'model:package-category']
});

test('packages relationship', function(assert) {
  var Item = this.subject().store.modelFor('item');
  var relationship = Ember.get(Item, 'relationshipsByName').get('packages');

  assert.equal(relationship.key, 'packages');
  assert.equal(relationship.kind, 'hasMany');
});

test('donor_condition relationship', function(assert) {
  var Item = this.subject().store.modelFor('item');
  var relationship = Ember.get(Item, 'relationshipsByName').get('donorCondition');

  assert.equal(relationship.key, 'donorCondition');
  assert.equal(relationship.kind, 'belongsTo');
});

test('packageType relationship', function(assert) {
  var Item = this.subject().store.modelFor('item');
  var relationship = Ember.get(Item, 'relationshipsByName').get('packageType');

  assert.equal(relationship.key, 'packageType');
  assert.equal(relationship.kind, 'belongsTo');
});

test('Valid ember-data Model', function(assert) {
  var record;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('item', {id: 1, donorDescription: 'Test'});
    record = subject.store.peekRecord('item', 1);
  });

  assert.equal(record.get('donorDescription'), 'Test');
});

test('allPackageCategories', function(assert) {
  var record, pkgType, pkgCategory;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('package_type', {id: 5, code: "ABC"});
    pkgType = subject.store.peekRecord('package_type', 5);

    subject.store.createRecord('item', {id: 5, packageType: pkgType});
    record = subject.store.peekRecord('item', 5);

    subject.store.createRecord('package_category', {id: 5, packageTypeCodes: "ABC"});
    pkgCategory = subject.store.peekRecord('package_category', 5);
  });

  assert.equal(record.get('allPackageCategories.firstObject.id'), [pkgCategory.id]);
});
