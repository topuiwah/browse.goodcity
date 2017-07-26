import PublicRoute from './browse_pages';
import Ember from 'ember';

export default PublicRoute.extend({
  messageBox: Ember.inject.service(),
  transition: null,
  isAvailable: false,

  beforeModel(transition) {
    this._super(...arguments);
    this.set('transition', transition);
  },

  model(params, transition) {
    var item = this.store.peekRecord('item', params["id"]);
    if(!item || !item.get("quantity") || !item.get("isAvailable")) {
      this.set('isAvailable', false);
    } else {
      this.set('isAvailable', true);
    }
    this.set('transition', transition);
    return item;
  },

  afterModel(){
    if(!this.get('isAvailable')) {
      this.get('transition').abort();
      this.get('messageBox').alert('Sorry! This item is no longer available.',
      () => {
        this.transitionTo('/browse');
      });
    }
  },

  setupController(controller, model){
    controller.set('model', model);
    controller.set("previewUrl", model.get("previewImageUrl"));
    this.controllerFor('application').set('pageTitle',
      this.get('i18n').t("itemdetail.view"));
  }
});
