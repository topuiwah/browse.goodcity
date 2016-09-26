import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["createdAt:desc"],
  arrangedOrders: Ember.computed.sort("orders", "sortProperties"),
  selectedOrder: null,
  orders: Ember.computed.alias('model'),

  actions: {
    setOrder(order) {
      this.set('selectedOrder', order);
    },
  }
});
