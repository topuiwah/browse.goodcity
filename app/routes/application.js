import Ember from 'ember';
import config from '../config/environment';
import preloadDataMixin from '../mixins/preload_data';

const { getOwner } = Ember;

export default Ember.Route.extend(preloadDataMixin, {

  logger: Ember.inject.service(),
  messageBox: Ember.inject.service(),
  i18n: Ember.inject.service(),
  previousRoute: null,
  isErrPopUpAlreadyShown: false,

  init() {
    var storageHandler = function () {
      var authToken = window.localStorage.getItem('authToken');
      if(authToken !== null && authToken.length === 0) {
        window.location.reload();
      }
    };
    window.addEventListener("storage", function() {
      storageHandler();
    }, false);
  },

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

  showLoginError() {
    if (this.session.get('isLoggedIn')) {
      this.session.clear();
      this.store.unloadAll();
      var loginController = this.controllerFor('login');
      loginController.set('attemptedTransition', this.get('previousRoute'));
      this.get('messageBox').alert(this.get("i18n").t('must_login'), () =>
        this.transitionTo('login')
      );
    }
  },

  showSomethingWentWrong(reason) {
    this.get("logger").error(reason);
    if(!this.get('isErrPopUpAlreadyShown')) {
      this.set('isErrPopUpAlreadyShown', true);
      this.get("messageBox").alert(this.get("i18n").t("unexpected_error"), () => {
        this.set('isErrPopUpAlreadyShown', false);
      });
    }
  },

  offlineError(reason){
    this.get("messageBox").alert(this.get("i18n").t("offline_error"));
    if(!reason.isAdapterError){
      this.get("logger").error(reason);
    }
  },

  quotaExceededError(reason){
    this.get("logger").error(reason);
    this.get("messageBox").alert(this.get("i18n").t("QuotaExceededError"));
  },

  handleError: function(reason) {
    try
    {
      var status;
      // let hasPopup = Ember.$('.reveal-modal:visible').length > 0;
      try { status = parseInt(reason.errors[0].status, 10); }
      catch (err) { status = reason.status; }

      if(!window.navigator.onLine){
        this.offlineError(reason);
      } else if(reason.name === "QuotaExceededError") {
        this.quotaExceededError(reason);
      } else if (reason.name === "NotFoundError" && reason.code === 8) {
        return false;
      } else if (status === 401) {
        this.showLoginError();
      } else {
        this.showSomethingWentWrong(reason);
      }
    } catch (err) { console.log(err); }
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
      } catch (err) { console.log(err); }
    }
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.set("pageTitle", this.get('i18n').t("browse.title"));
  }
});
