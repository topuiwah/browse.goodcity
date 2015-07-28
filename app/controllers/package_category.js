import Ember from 'ember';
import SortItems from './sort_items';

export default SortItems.extend({

  queryParams: ["page"],
  page:        1,
  perPage:     12,

  selectedCategoryId: null,
  selectedSort:       null,
  categoryItems:      Ember.computed.alias("category.items"),

  currentCategoryId: function(){
    return this.get('selectedCategoryId') || this.get('model.id');
  }.property('selectedCategoryId', 'model'),

  currentSort: function(){
    return this.get('selectedSort') || this.get("sortOptions").get('firstObject.id');
  }.property('selectedSort'),

  category: function(key, value){
    return (arguments.length > 1) ? value : this.get('model');
  }.property(),

  actions: {
    filterItems() {
      var selectedCategoryId = this.get('selectedCategoryId');
      var selectedCategory;

      if(selectedCategoryId) {
        selectedCategory = this.store.peekRecord('package_category', selectedCategoryId);
      } else {
        selectedCategory = this.get('model');
      }
      this.set("category", selectedCategory);
    },
  }

});
