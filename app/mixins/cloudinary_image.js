import Ember from "ember";

export default Ember.Mixin.create({

  generateUrl: function(width, height, crop) {
    //e.g. cloudinaryId = 1406959628/wjvaksnadntp239n6vwe.png
    var defaultItemImage = "1438323699/default_item_image.jpg";
    var id = this.get('cloudinaryId') || defaultItemImage;
    if (!id || id.indexOf("/") === -1) { return null; }

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
