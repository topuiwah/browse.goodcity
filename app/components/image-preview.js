import Ember from "ember";
import ObserveScreenResize from "./observe-screen-resize";

export default ObserveScreenResize.extend({

  lightGalleryObj: null,

  isSmallScreen: Ember.computed({
    get() {
      return this.screenResized();
    },
    set(key, value) {
      return value;
    }
  }),

  observeScreen: function() {
    if(!this.isDestroyed || !this.isDestroying) {
      this.set("isSmallScreen", this.screenResized());
      this.initializeLightgallery();
    }
  },

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
