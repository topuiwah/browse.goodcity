import Ember from 'ember';
import AjaxPromise from 'browse/utils/ajax-promise';
const { getOwner } = Ember;

export default Ember.Controller.extend({

  subscription: Ember.inject.controller(),
  messageBox: Ember.inject.service(),
  loggedInUser: false,
  i18n: Ember.inject.service(),

  initSubscription: Ember.on('init', function() {
    this.get('subscription').send('wire');
  }),

  displayCart: false,
  showCartDetailSidebar: false,
  cartscroll: Ember.inject.service(),

  hasCartItems: Ember.computed.alias('cart.isNotEmpty'),
  cartLength: Ember.computed.alias('cart.counter'),

  isUserLoggedIn: Ember.computed('loggedInUser', function() {
    this.set('loggedInUser', false);
    let authToken = window.localStorage.authToken;
    return authToken ? true : false;
  }),

  actions: {
    cancelOrderPopUp(orderId) {
      this.get("messageBox").custom(this.get("i18n").t("order.order_delete_confirmation"),
        this.get("i18n").t("order.cancel_order"),
        () => {
          this.send("cancelOrder", orderId);
        },
        this.get("i18n").t("not_now")
        );
    },

    cancelOrder(orderId) {
      var order = this.store.peekAll("order", orderId);
      if(order) {
        this.get("cart").clearItems();
        var loadingView = getOwner(this).lookup('component:loading').append();
        new AjaxPromise("/orders/" + orderId, "DELETE", this.get('session.authToken'))
        .then(data => {
          this.get("store").unloadRecord("order", order.get("id"));
          this.get("store").pushPayload(data);
          loadingView.destroy();
          this.transitionToRoute("index");
        });
      }
    },

    logMeOut() {
      this.session.clear(); // this should be first since it updates isLoggedIn status
      this.set('loggedInUser', "");
      this.transitionToRoute('browse');
    },

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
    },

    openCart(){
      this.transitionToRoute('cart');
    }
  }

});
