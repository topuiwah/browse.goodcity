import Ember from 'ember';

export default Ember.Controller.extend({

  displayCart: false,

  hasCartItems: Ember.computed.alias('cart.isNotEmpty'),
  cartLength: Ember.computed.alias('cart.counter'),

  cartItems: Ember.computed('cart.[]', function() {
    var content = this.get("cart.content");
    var allItems = [];
    content.forEach(record => allItems.push(this.get("store").peekRecord(record.modelType, record.id)));
    return allItems;
  }),

  actions: {
    displayCart() {
      this.toggleProperty('displayCart');
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
