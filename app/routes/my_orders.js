import Ember from 'ember';
import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  beforeModel() {
    this._super(...arguments);
    this.set('cart.checkout', false);
  },

  model() {
    return Ember.RSVP.hash({
      organisation: this.store.peekAll('organisation').objectAt(0),
      user: this.store.peekAll('user').objectAt(0),
      orders: this.store.peekAll('order')
    });
  },

  setupController(controller, model){
    this._super(controller, model);
    controller.toggleProperty("triggerFlashMessage");
  }
});
