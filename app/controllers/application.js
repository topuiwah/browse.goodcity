import Ember from 'ember';

export default Ember.Controller.extend({

  subscription: Ember.inject.controller(),
  messageBox: Ember.inject.service(),

  initSubscription: Ember.on('init', function() {
    this.get('subscription').send('wire');
  }),

  displayCart: false,
  showCartDetailSidebar: false,
  cartscroll: Ember.inject.service(),

  hasCartItems: Ember.computed.alias('cart.isNotEmpty'),
  cartLength: Ember.computed.alias('cart.counter'),

  actions: {
    displayCart() {
      this.set('showCartDetailSidebar', true);
      this.toggleProperty('displayCart');
      Ember.run.later(this, function() {
        this.get('cartscroll').resize();
      }, 0);
    },

    showCartItem(itemId, type) {
      var item = this.get('store').peekRecord(type, itemId);
      this.transitionToRoute(type, itemId,
        { queryParams:
          {
            categoryId: item.get("allPackageCategories.firstObject.id")
          }
        });
    },

    removeItem(itemId, type) {
      var item = this.get('store').peekRecord(type, itemId);
      this.get('cart').removeItem(item);
    },

    checkout() {
      this.set('showCartDetailSidebar', false);
      var cartHasItems = this.get("cart.cartItems").length;
      if(cartHasItems > 0) {
        this.get('cart').set('checkout', true);
        this.transitionToRoute('order_details');
      } else {
        this.get('messageBox').alert(
          "The items in your cart are no longer available. Please add more items in your cart before placing an order. Thank you!",
          () => {
            this.get("cart").clearItems();
            this.set('displayCart', false);
          });
      }
    }
  }

});
