import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.peekRecord('package_category', params["id"]);
  },

  setupController(controller, model){
    controller.set('model', model);
    controller.set("category", model);
    controller.set("selectedCategoryId", null);
    controller.set("selectedSort", ["createdAt:desc"]);
    this.controllerFor('application').set('pageTitle', model.get("name"));
  }
});
