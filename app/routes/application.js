import Ember from 'ember';
import config from '../config/environment';
import preloadDataMixin from '../mixins/preload_data';

export default Ember.Route.extend(preloadDataMixin, {

  i18n: Ember.inject.service(),

  beforeModel: function() {
    this.set("i18n.locale", this.get("session.language") || config.i18n.defaultLocale);
    return this.preloadData();
  },

  renderTemplate: function() {
    this.render();
    this.render('sidebar', {
      into: 'application',
      outlet: 'sidebar'
    });
  },

  actions: {
    loading: function() {
      Ember.$(".loading-indicator").remove();
      var component = this.container.lookup('component:loading').append();
      this.router.one('didTransition', component, 'destroy');
    },
  },

  setupController: function(controller, model){
    controller.set('model', model);
    controller.set("pageTitle", this.get('i18n').t("browse.title"));
  }
});
