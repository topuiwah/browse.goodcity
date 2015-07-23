import Ember from "ember";

export default Ember.Component.extend({

  didInsertElement() {
    Ember.$("#lightGallery").lightGallery({
      thumbnail: false,
      hideControlOnEnd: true,
      closable: false,
      counter: true,
      swipeThreshold : 50,
      enableTouch : true,
    });
  },

});
