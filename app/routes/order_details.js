import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  beforeModel(transition) {
    var draftOrder = this.get('session').draftOrder();
    if(draftOrder) {
      transition.abort();
      this.transitionTo('order.transport_details', draftOrder);
    }
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('blankPurpose', false);
  }

});
