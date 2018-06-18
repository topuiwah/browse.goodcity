import Ember from 'ember';
import applicationController from './application';

export default applicationController.extend({
  sortProperties: ["createdAt:desc"],
  arrangedOrders: Ember.computed.sort("model.orders", "sortProperties"),
  selectedOrder: null,
  orders: Ember.computed.alias('model'),
  queryParams: ['submitted'],
  triggerFlashMessage: false,

  submitted: false,

  submittedOrderFlashMessage: Ember.observer("submitted", 'triggerFlashMessage', function() {
    if(this.get("submitted")) {
      this.get("flashMessage").show("order.flash_submit_message");
    }
  }),

  actions: {
    setOrder(order) {
      this.set('selectedOrder', order);
    }
  }
});
