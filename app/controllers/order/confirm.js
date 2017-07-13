import Ember from 'ember';
import AjaxPromise from 'browse/utils/ajax-promise';
const { getOwner } = Ember;

export default Ember.Controller.extend({
  cart: Ember.inject.service(),
  order: Ember.computed.alias("model.order"),

  actions: {
    confirmOrder() {
      var order = this.get('order');
      var loadingView = getOwner(this).lookup('component:loading').append();
      var orderParams = {
        state_event: "submit"
      };
      new AjaxPromise(`/orders/${order.get('id')}`, "PUT", this.get('session.authToken'), { order: orderParams })
        .then(data => {
          this.get("store").pushPayload(data);
          loadingView.destroy();
          this.get('cart').clearItems();
          this.transitionToRoute("/my_orders", data.order.id);
        });
    }
  }
});
