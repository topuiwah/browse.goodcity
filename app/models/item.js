import Ember from 'ember';
import DS from 'ember-data';
import cloudinaryImage from '../mixins/cloudinary_image';

var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

export default DS.Model.extend(cloudinaryImage, {
  donorDescription: attr('string'),
  createdAt:        attr('date'),
  updatedAt:        attr('date'),
  images:           hasMany('image'),
  packages:         hasMany('package'),
  packageType:      belongsTo('package_type'),
  donorCondition:   belongsTo('donor_condition'),
  saleable:         attr('boolean'),

  mainPackage:      Ember.computed.alias('packages.firstObject'),

  favouriteImage: function(){
    return this.get("images").filterBy("favourite").get("firstObject");
  }.property('images.@each.favourite'),

  otherImages: function(){
    return this.get("images").toArray().removeObject(this.get("favouriteImage"));
  }.property('images.[]'),

  sortedImages: function(){
    var images = this.get('otherImages').toArray();
    images.unshift(this.get("favouriteImage"));
    return images;
  }.property('otherImages.[]', 'favouriteImage'),

  displayImage: function() {
    return this.get("favouriteImage") ||
      this.get("images").sortBy("id").get("firstObject") || null;
  }.property('images.@each.favourite'),

  displayImageUrl: function() {
    return this.get('displayImage.defaultImageUrl') || this.generateUrl(500, 500, true);
  }.property('displayImage'),

  previewImageUrl: function() {
    return this.get('displayImage.previewImageUrl') || this.generateUrl(265, 265, true);
  }.property('displayImage'),

  allPackageCategories: function(){
    return this.get('packageType.allPackageCategories');
  }.property('packageType', 'packageType.allPackageCategories.[]'),

  otherPackages: function(){
    return this.get('packages').toArray().removeObject(this.get('mainPackage'));
  }.property('packages.[]'),
});
