import Ember from "ember";

export default Ember.Component.extend({
  screenResized: function() {
    return matchMedia(Foundation.media_queries.small).matches &&
      !matchMedia(Foundation.media_queries.medium).matches;
  },

  observeScreen: function() {
    if (!this.screenResized()){
      $('.off-canvas-wrap').removeClass('move-right');
    }
  },

  initComonent: function() {
    var updateScreen = Ember.run.bind(this, this.observeScreen);
    window.addEventListener("resize", updateScreen);
  }.on("init"),

  didInsertElement() {
    Ember.$(document).foundation({
      offcanvas: { close_on_click: true }
    });
  },

});
