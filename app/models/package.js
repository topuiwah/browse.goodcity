import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  quantity:        attr('number'),
  length:          attr('number'),
  width:           attr('number'),
  height:          attr('number'),
  notes:           attr('string'),

  createdAt:       attr('date'),
  updatedAt:       attr('date'),
  item:            belongsTo('item'),
  packageType:     belongsTo('package_type'),
  imageId:         attr('number'),

  packageName: Ember.computed('packageType', function() {
    return this.get('packageType.name');
  }),

  packageTypeObject: Ember.computed('packageType', function() {
    var obj = this.get('packageType').getProperties('id', 'name', 'isItemTypeNode');
    obj.id = obj.packageTypeId = parseInt(obj.id);
    return obj;
  }),

  dimensions: Ember.computed('width', 'height', 'length', function() {
    var res = '';
    var append = val => {
      if (val) { res += !res ? val : ' x ' + val; }
    };
    append(this.get('width'));
    append(this.get('height'));
    append(this.get('length'));
    return !res ? '' : res + 'cm';
  }),

  image: Ember.computed("imageId", function() {
    return this.store.getById("image", this.get("imageId"));
  }),

  displayImageUrl: Ember.computed("image", "item.displayImageUrl", function() {
    return this.get("image") ? this.get("image.thumbImageUrl") : this.get("item.displayImageUrl");
  })
});
