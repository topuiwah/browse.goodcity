import Ember from 'ember';

export default Ember.Controller.extend({
  displayCart: false,

  actions: {
    displayCart() {
      this.toggleProperty('displayCart');
    }
  }
});
