import Ember from 'ember';
import preloadDataMixin from '../mixins/preload_data';
import AjaxPromise from 'browse/utils/ajax-promise';

export default Ember.Route.extend(preloadDataMixin, {

  cart: Ember.inject.service(),
  draftOrder: Ember.computed.alias('session.draftOrder'),

  beforeModel() {
    return this.preloadData();
  },

  afterModel() {
    // Merging Offline cart items with Order in draft state
    var ordersPackages = this.store.peekAll('orders-package');
    var package_ids = [];

    if (ordersPackages.length) {
      ordersPackages.forEach(order => {
        this.get('cart').pushItem(order.get('package'));
      });

      if (this.get('draftOrder')) {
        this.get("cart.cartItems").forEach(record => {
          if(record) {
            var ids = record.get("isItem") ? record.get("packages").getEach("id") : [record.get("id")];
            package_ids = package_ids.concat(ids);
          }
        });

        var orderParams = {
          cart_package_ids: package_ids
        };

        new AjaxPromise(`/orders/${this.get('draftOrder.id')}`, "PUT", this.get('session.authToken'), { order: orderParams })
          .then(data => {
            this.get("store").pushPayload(data);
          });
      }
    }

    // After everthying has been loaded, redirect user to requested url
    var attemptedTransition = this.controllerFor('login').get('attemptedTransition');
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.set('attemptedTransition', null);
    }
  }
});
