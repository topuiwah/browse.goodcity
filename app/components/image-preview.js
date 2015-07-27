import Ember from "ember";

export default Ember.Component.extend({

  lightGalleryObj: null,

  isSmallScreen: function(key, value){
    return (arguments.length > 1) ? value : this.screenResized();
  }.property(),

  screenResized: function() {
    return matchMedia(Foundation.media_queries.small).matches &&
      !matchMedia(Foundation.media_queries.medium).matches;
  },

  observeScreen: function() {
    this.set("isSmallScreen", this.screenResized());
    this.initializeLightgallery();
  },

  initComonent: function() {
    var updateScreen = Ember.run.bind(this, this.observeScreen);
    window.addEventListener("resize", updateScreen);
  }.on("init"),

  initializeLightgallery: function(){
    var gallery = this.get("lightGalleryObj");
    if(gallery) { gallery.destroy(); }

    var lightGalleryObj = Ember.$("#lightGallery").lightGallery({
      thumbnail: false,
      hideControlOnEnd: true,
      closable: false,
      counter: true,
      swipeThreshold : 50,
      enableTouch : true
    });
    this.set('lightGalleryObj', lightGalleryObj);
  },

  didInsertElement() {
    this.initializeLightgallery();
  },

});
