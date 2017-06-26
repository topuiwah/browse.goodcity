import Ember from 'ember';
import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model() {
    return Ember.RSVP.hash({
      organisation: this.store.peekAll('organisation').objectAt(0),
      user: this.store.peekAll('user').objectAt(0),
    });
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('blankPurpose', false);
  }

});
