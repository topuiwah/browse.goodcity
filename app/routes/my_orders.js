import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  beforeModel() {
    this._super(...arguments);
    this.set('cart.checkout', false);
  },

  model() {
    return this.store.peekAll('order');
  },
});
