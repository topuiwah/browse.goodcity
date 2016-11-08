import Ember from 'ember';

export default Ember.Controller.extend({
  showCartDetailSidebar: false,
  parentCategories: Ember.computed('model.[]', function() {
    return this.get('model').filterBy('parentId', null);
  }),
});
