import Ember from "ember";
import DS from 'ember-data';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
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

  generateUrl: function(width, height, crop) {
    //e.g. cloudinaryId = 1406959628/wjvaksnadntp239n6vwe.png
    var id = this.get('cloudinaryId');
    if (!id || id.indexOf("/") === -1) {
      return null;
    }
    var version = id.split("/")[0];
    var filename = id.substring(id.indexOf("/") + 1);
    return Ember.$.cloudinary.url(filename, {
      version: version,
      height: height,
      width: width,
      crop: crop === true ? 'fill' : 'fit',
      flags: "progressive",
      id: id,
      secure: true,
      protocol: 'https:',
      default_image: "default_item_image.jpg"
    });
  }
});
