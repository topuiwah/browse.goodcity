import Ember from 'ember';

const {
  get,
  computed,
  Object: EmberObject
} = Ember;

export default EmberObject.extend({

  modelType: "",

  total: computed('quantity', 'price', function() {
    return get(this, 'quantity') * get(this, 'price');
  }),

  guidProps: ['modelType', 'id'],

  guid: computed('guidProps', function() {
    let guidVal = get(this, 'guidProps').sort().map((prop) => {
      return get(this, prop);
    }).join('-');

    return guidVal;
  }),

  toCartItem() {
    return this;
  }
});
