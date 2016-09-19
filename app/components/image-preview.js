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
    if(this.isDestroyed || this.isDestroying) {
      this.set("isSmallScreen", this.screenResized());
      this.initializeLightgallery();
    }
  },

  initializeLightgallery: function(){
    
    var lightGalleryObj = Ember.$("#lightGallery").lightGallery({
      download: false,
      thumbnail: false,
      hideControlOnEnd: true,
      closable: false,
      counter: true,
      swipeThreshold : 50,
      enableTouch : true,
      selector: '.imageZoom'
    });
    this.set('lightGalleryObj', lightGalleryObj);
  },

  didInsertElement() {
    this.initializeLightgallery();
  },

  willDestroyElement() {
    var lightGalleryData = Ember.$('#lightGallery').data('lightGallery');
    if(lightGalleryData){
      lightGalleryData.destroy(true);
    }
  }
});
