import DS from 'ember-data';
import cloudinaryImage from '../mixins/cloudinary_image';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend(cloudinaryImage, {
  favourite:     attr('boolean'),
  cloudinaryId:  attr('string'),
  item:          belongsTo('item'),

  imageUrl: function() {
    return this.generateUrl();
  }.property('cloudinaryId'),

  defaultImageUrl: function() {
    return this.generateUrl(500, 500, true);
  }.property('cloudinaryId'),

  thumbImageUrl: function() {
    return this.generateUrl(50, 50, true);
  }.property('cloudinaryId'),

  previewImageUrl: function() {
    return this.generateUrl(265, 265, true);
  }.property('cloudinaryId'),

  smallScreenPreviewImageUrl: function() {
    return this.generateUrl(640, 365, true);
  }.property('cloudinaryId'),
});
