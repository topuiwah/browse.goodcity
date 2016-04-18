import Ember from 'ember';

export default Ember.Controller.extend({
  parentCategories: Ember.computed('model.[]', function() {
    return this.get('model').filterBy('parentId', null);
  }),
});
