import Ember from "ember";

export default Ember.Component.extend({

  didInsertElement() {
    Ember.$(document).foundation({
      offcanvas: { close_on_click: true }
    });
  },

});
