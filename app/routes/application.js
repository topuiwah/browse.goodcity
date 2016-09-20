import Ember from 'ember';
import config from '../config/environment';
import preloadDataMixin from '../mixins/preload_data';

const { getOwner } = Ember;

export default Ember.Route.extend(preloadDataMixin, {

  logger: Ember.inject.service(),
  messageBox: Ember.inject.service(),
  i18n: Ember.inject.service(),

  beforeModel() {
    this.set("i18n.locale", this.get("session.language") || config.i18n.defaultLocale);
    Ember.onerror = window.onerror = error => this.handleError(error);
    return this.preloadData();
  },

  renderTemplate() {
    this.render();
    this.render('sidebar', {
      into: 'application',
      outlet: 'sidebar'
    });
  },

  handleError: function(reason) {
    try
    {
      var status;
      try { status = parseInt(reason.errors[0].status); }
      catch (err) { status = reason.status; }

      this.get("logger").error(reason);
      this.get("messageBox").alert(this.get("i18n").t("unexpected_error"));

    } catch (err) {}
  },

  actions: {
    loading() {
      Ember.$(".loading-indicator").remove();
      var component = getOwner(this).lookup('component:loading').append();
      this.router.one('didTransition', component, 'destroy');
    },

    error(reason) {
      try {
        this.handleError(reason);
      } catch (err) {}
    }
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.set("pageTitle", this.get('i18n').t("browse.title"));
  }
});
