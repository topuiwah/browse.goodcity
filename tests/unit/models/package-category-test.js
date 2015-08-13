import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('packageCategory', {
  needs: ['model:item']
});

test('Valid ember-data Model', function(assert) {
  var record;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('packageCategory', {id: 1, name: "Test"});
    record = subject.store.peekRecord('packageCategory', 1);
  });

  assert.equal(record.get('name'), "Test");
});

test('parentCategory and allChildCategories', function(assert) {
  var parent, child;
  var subject = this.subject();

  Ember.run(function() {
    subject.store.createRecord('packageCategory', {id: 1});
    parent = subject.store.peekRecord('packageCategory', 1);

    subject.store.createRecord('packageCategory', {id: 2, parentId: 1});
    child = subject.store.peekRecord('packageCategory', 2);
  });

  // verify parentCategory
  assert.equal(parent.get('parentCategory'), null);
  assert.equal(child.get('parentCategory.id'), parent.id);

  // verify allChildCategories
  assert.equal(parent.get('allChildCategories.firstObject.id'), child.id);
  assert.equal(child.get('allChildCategories.length'), 0);
});
