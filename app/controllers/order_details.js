import Ember from 'ember';

export default Ember.Controller.extend({
  description: "",

  actions: {
    clearDescription() {
      this.set("description", "");
    },

    save_order(){
      this.transitionToRoute("transport_details");
    }
  }
});
