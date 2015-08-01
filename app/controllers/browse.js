import Ember from 'ember';

export default Ember.Controller.extend({
  pageTitle: "Browse",

  parentCategories: function() {
    return this.get('model').filterBy('parentId', null);
  }.property('model.[]')
});
