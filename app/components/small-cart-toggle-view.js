import Ember from "ember";

export default Ember.Component.extend({
  showCartSummary: false,

  actions: {
    toggleCartSummary() {
      this.toggleProperty("showCartSummary");
    }
  }
});
