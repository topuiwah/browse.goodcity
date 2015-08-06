import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.peekAll('package_category');
  },

  setupController: function(controller, model){
    controller.set('model', model);
    this.controllerFor('application').set('pageTitle', this.get('i18n').t("browse.title"));
  }
});
