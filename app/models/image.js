import Ember from 'ember';
import DS from 'ember-data';
import cloudinaryImage from '../mixins/cloudinary_image';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend(cloudinaryImage, {
  favourite:     attr('boolean'),
  cloudinaryId:  attr('string'),
  package:       belongsTo('package', { async: false }),

  imageUrl: Ember.computed('cloudinaryId', function() {
    return this.generateUrl();
  }),

  defaultImageUrl: Ember.computed('cloudinaryId', function() {
    return this.generateUrl(500, 500, true);
  }),

  thumbImageUrl: Ember.computed('cloudinaryId', function() {
    return this.generateUrl(50, 50, true);
  }),

  previewImageUrl: Ember.computed('cloudinaryId', function() {
    return this.generateUrl(265, 265, true);
  }),

  smallScreenPreviewImageUrl: Ember.computed('cloudinaryId', function() {
    return this.generateUrl(640, 365, true);
  }),
});
