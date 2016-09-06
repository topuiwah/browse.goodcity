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

  packages:         hasMany('package', { async: false }),
  packageType:      belongsTo('package_type', { async: false }),
  donorCondition:   belongsTo('donor_condition', { async: false }),
  saleable:         attr('boolean'),

  mainPackage:      Ember.computed.alias('packages.firstObject'),

  images: Ember.computed('packages.@each.images.[]', function(){
    var images = [];
    this.get("packages").forEach(function(pkg){
      var pkgImages = pkg.get("images") ? pkg.get("images").toArray() : [];
      images = images.concat(pkgImages);
    });
    return images;
  }),

  isItem: Ember.computed('this', function(){
    return this.get('constructor.modelName') === 'item';
  }),

  favouriteImage: Ember.computed('images.@each.favourite', function(){
    return this.get("images").filterBy("favourite").get("firstObject");
  }),

  otherImages: Ember.computed('images.[]', function(){
    return this.get("images").toArray().removeObject(this.get("favouriteImage"));
  }),

  sortedImages: Ember.computed('otherImages.[]', 'favouriteImage', function(){
    var images = this.get('otherImages').toArray();
    images.unshift(this.get("favouriteImage"));
    return images;
  }),

  displayImage: Ember.computed('images.@each.favourite', function() {
    return this.get("favouriteImage") ||
      this.get("images").sortBy("id").get("firstObject") || null;
  }),

  displayImageUrl: Ember.computed('displayImage', function() {
    return this.get('displayImage.defaultImageUrl') || this.generateUrl(500, 500, true);
  }),

  previewImageUrl: Ember.computed('displayImage', function() {
    return this.get('displayImage.previewImageUrl') || this.generateUrl(265, 265, true);
  }),

  allPackageCategories: Ember.computed.alias('packageType.allPackageCategories'),

  otherPackages: Ember.computed('packages.[]', function(){
    return this.get('packages').toArray().removeObject(this.get('mainPackage'));
  }),
});
