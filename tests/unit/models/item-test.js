import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('item', {
  needs: ['model:package', 'model:image', 'model:donor-condition',
    'model:package-type', 'model:package-category']
});

test('images relationship', function(assert) {
  var Item = this.subject().store.modelFor('item');
  var relationship = Ember.get(Item, 'relationshipsByName').get('images');

  assert.equal(relationship.key, 'images');
  assert.equal(relationship.kind, 'hasMany');
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

test('mainPackage', function(assert) {
  var record, pkg;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('item', {id: 2});
    record = subject.store.peekRecord('item', 2);

    subject.store.createRecord('package', {id: 2, item: record});
    pkg = subject.store.peekRecord('package', 2);
  });

  assert.equal(record.get('mainPackage'), pkg);
});

test('otherPackages', function(assert) {
  var record, pkg1, pkg2;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('item', {id: 3});
    record = subject.store.peekRecord('item', 3);

    subject.store.createRecord('package', {id: 3, item: record});
    pkg1 = subject.store.peekRecord('package', 3);

    subject.store.createRecord('package', {id: 4, item: record});
    pkg2 = subject.store.peekRecord('package', 4);
  });

  assert.equal(record.get('mainPackage'), pkg1);
  assert.equal(record.get('otherPackages.firstObject.id'), [pkg2.id]);
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

test('favouriteImage and otherImages', function(assert) {
  var record, img, favImg;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('item', {id: 7});
    record = subject.store.peekRecord('item', 7);

    subject.store.createRecord('image', {id: 7, favourite: true, item: record});
    favImg = subject.store.peekRecord('image', 7);

    subject.store.createRecord('image', {id: 8, item: record});
    img = subject.store.peekRecord('image', 8);
  });

  assert.equal(record.get('favouriteImage.id'), [favImg.id]);
  assert.equal(record.get('otherImages.firstObject.id'), [img.id]);
});
