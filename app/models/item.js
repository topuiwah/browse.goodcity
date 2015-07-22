import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

export default DS.Model.extend({
  donorDescription: attr('string'),
  createdAt:        attr('date'),
  updatedAt:        attr('date'),
  images:           hasMany('image'),
  packages:         hasMany('package'),
  packageType:      belongsTo('package_type'),
  donorCondition:   belongsTo('donor_condition'),
  saleable:         attr('boolean'),

  mainPackage:      Ember.computed.alias('packages.firstObject'),

  displayImage: function() {
    return this.get("images").filterBy("favourite").get("firstObject") ||
      this.get("images").sortBy("id").get("firstObject") || null;
  }.property('images.@each.favourite'),

  displayImageUrl: function() {
    return this.get('displayImage.thumbImageUrl') || "assets/images/default_item.jpg";
  }.property('displayImage'),

  allPackageCategories: function(){
    return this.get('packageType.allPackageCategories');
  }.property('packageType', 'packageType.allPackageCategories.[]'),

  otherPackages: function(){
    return this.get('packages').toArray().removeObject(this.get('mainPackage'));
  }.property('packages.[]'),

});
