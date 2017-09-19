import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('address', 'Address Model', {
  needs: ['model:district', 'model:addressable']
});

test('Relationships with other models', function(assert){
  assert.expect(4);

  var address = this.store().modelFor('address');
  var relationshipsWithDistrict = Ember.get(address, 'relationshipsByName').get('district');
  var relationshipsWithAddressable = Ember.get(address, 'relationshipsByName').get('addressable');

  assert.equal(relationshipsWithDistrict.key, 'district');
  assert.equal(relationshipsWithDistrict.kind, 'belongsTo');

  assert.equal(relationshipsWithAddressable.key, 'addressable');
  assert.equal(relationshipsWithAddressable.kind, 'belongsTo');
});

test('check attributes', function(assert){
  var model = this.subject();

  var addressableType = Object.keys(model.toJSON()).indexOf('addressableType') > -1;

  assert.ok(addressableType);
});


test('Address is a valid ember-data Model', function(assert){
  assert.expect(1);

  var store = this.store();
  var record = null;

  Ember.run(function(){
    store.createRecord('address', { id: 1, addressableType: "User" });
    record = store.peekRecord('address', 1);
  });

  assert.equal(record.get('addressableType'), "User");
});



