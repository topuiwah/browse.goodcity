import Ember from 'ember';
import preloadDataMixin from '../mixins/preload_data';

export default Ember.Route.extend(preloadDataMixin, {

  beforeModel() {
    return this.preloadData();
  },

  afterModel() {
    // After everthying has been loaded, redirect user to requested url
    var attemptedTransition = this.controllerFor('login').get('attemptedTransition');
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.set('attemptedTransition', null);
    }
    else {
      this.transitionTo('/browse');
    }
  }
});
