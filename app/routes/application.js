import Ember from 'ember';
import config from '../config/environment';
import preloadDataMixin from '../mixins/preload_data';

const { getOwner } = Ember;

export default Ember.Route.extend(preloadDataMixin, {

  logger: Ember.inject.service(),
  messageBox: Ember.inject.service(),
  i18n: Ember.inject.service(),
  previousRoute: null,

  beforeModel(transition) {
    try {
      localStorage.test = "isSafariPrivateBrowser";
    } catch (e) {
      this.get("messageBox").alert(this.get("i18n").t("QuotaExceededError"));
    }
    localStorage.removeItem('test');
    this.set("i18n.locale", this.get("session.language") || config.i18n.defaultLocale);
    this.set('previousRoute',transition);
    Ember.onerror = window.onerror = error => {
      if(error.errors && error.errors[0] && error.errors[0].status === "401") {
        transition.abort();
      }
      this.handleError(error);
    };
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

      if(reason.name === "QuotaExceededError") {
        this.get("logger").error(reason);
        this.get("messageBox").alert(this.get("i18n").t("QuotaExceededError"));
      } else if (status === 401) {
        if (this.session.get('isLoggedIn')) {
          this.session.clear();
          this.store.unloadAll();
          var loginController = this.controllerFor('login');
          loginController.set('attemptedTransition', this.get('previousRoute'));
          this.get('messageBox').alert(this.get("i18n").t('must_login'), () =>
            this.transitionTo('login')
          );
        }
      } else {
        this.get("logger").error(reason);
        this.get("messageBox").alert(this.get("i18n").t("unexpected_error"));
      }
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
