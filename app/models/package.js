import Ember from 'ember';
import DS from 'ember-data';
import cloudinaryImage from '../mixins/cloudinary_image';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend(cloudinaryImage, {
  quantity:        attr('number'),
  length:          attr('number'),
  width:           attr('number'),
  height:          attr('number'),
  notes:           attr('string'),

  createdAt:       attr('date'),
  updatedAt:       attr('date'),
  item:            belongsTo('item', { async: false }),
  packageType:     belongsTo('package_type', { async: false }),
  image:           belongsTo('image', { async: false }),
  donorCondition:  belongsTo('donor_condition', { async: false }),
  itemId:          attr('number'),

  allPackageCategories: Ember.computed.alias('packageType.allPackageCategories'),

  _packages: Ember.computed(function() {
    return this.store.peekAll("package");
  }),

  hasSiblingPackages: Ember.computed('_packages.@each.itemId', function() {
    return this.get("itemId") && (this.get("_packages").filterBy("itemId", this.get("itemId")).length > 1);
  }),

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

  displayImageUrl: Ember.computed("image", "item.displayImageUrl", function() {
    return this.get('image.defaultImageUrl') || this.generateUrl(500, 500, true);
  }),

  previewImageUrl: Ember.computed('image', function() {
    return this.get('image.previewImageUrl') || this.generateUrl(265, 265, true);
  }),
});
