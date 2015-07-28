import Ember from "ember";
import ObserveScreenResize from "./observe-screen-resize";

export default ObserveScreenResize.extend({
  observeScreen: function() {
    if (!this.screenResized()){
      Ember.$('.off-canvas-wrap').removeClass('move-right');
    }
  },

  didInsertElement() {
    Ember.$(document).foundation({
      offcanvas: { close_on_click: true }
    });
  },

});
