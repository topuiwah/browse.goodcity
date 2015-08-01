import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.peekRecord('item', params["id"]);
  },

  setupController: function(controller, model){
    controller.set('model', model);
    controller.set("previewUrl", model.get("previewImageUrl"));
    this.controllerFor('application').set('pageTitle', "View Item");
  }
});
