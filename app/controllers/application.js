import Ember from 'ember';

export default Ember.Controller.extend({

  subscription: Ember.inject.controller(),

  initSubscription: Ember.on('init', function() {
    this.get('subscription').send('wire');
  }),

  displayCart: false,
  cartscroll: Ember.inject.service(),

  hasCartItems: Ember.computed.alias('cart.isNotEmpty'),
  cartLength: Ember.computed.alias('cart.counter'),

  actions: {
    displayCart() {
      this.toggleProperty('displayCart');
      Ember.run.later(this, function() {
        this.get('cartscroll').resize();
      }, 0);
    },

    showCartItem(item) {
      var modelName = item.get("isItem") ? "item" : "package";
      this.transitionToRoute(modelName, item.id,
        { queryParams:
          {
            categoryId: item.get("allPackageCategories.firstObject.id")
          }
        });
    },

    removeItem(item) {
      this.get('cart').removeItem(item);
    },

    checkout() {
      this.get('cart').set('checkout', true);
      this.transitionToRoute('order_details');
    }
  }

});
