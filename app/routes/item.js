import PublicRoute from './browse_pages';
import Ember from 'ember';

export default PublicRoute.extend({
  messageBox: Ember.inject.service(),
  isPublished: null,
  transition: null,

  beforeModel(transition) {
    this._super(...arguments);
    this.set('transition', transition);
    this.set('isPublished', null);
  },

  model(params, transition) {
    var item = this.store.peekRecord('item', params["id"]);
    if(!item || !item.get("quantity")) {
      this.set('isPublished', false);
    } else {
      this.set('isPublished', true);
    }
    this.set('transition', transition);
    return item;
  },

  afterModel() {
    if(this.get('isPublished') !== null && !this.get('isPublished')) {
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
