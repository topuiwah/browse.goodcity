import Ember from 'ember';
import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model() {
    return Ember.RSVP.hash({
      organisation: this.store.peekAll('organisation').objectAt(0),
      user: this.store.peekAll('user').objectAt(0)
    });
  },

  setupController(controller) {
    var order = this.get("store").peekAll("order").filterBy("state", "draft").get("firstObject");
    if(order) {
      controller.set("description", order.get("purposeDescription"));
      var purpose_ids = order.get("ordersPurposes").filterBy("orderId", parseInt(order.id)).getEach("purposeId");
      purpose_ids.forEach(id => {
        switch (id) {
          case 1:
            controller.set("organisation", true);
            break;
          case 2:
            controller.set("client", true);
            break;
          case 3:
            controller.set("trade", true);
            break;
        }
      });
    } else {
      controller.set("description", "");
      controller.set("organisation", false);
      controller.set("client", false);
      controller.set("trade", false);
    }
    this._super(...arguments);
    controller.set('blankPurpose', false);
  }

});
