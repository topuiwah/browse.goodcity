import Ember from 'ember';
import SortItems from './sort_items';

export default SortItems.extend({

  queryParams:    ['categoryId', 'sortBy'],
  categoryId:     null,
  sortBy:         null,
  selectedSort:   Ember.computed.alias('sortBy'),
  noNextItem:     Ember.computed.empty('nextItem'),
  noPreviousItem: Ember.computed.empty('previousItem'),

  category: function(){
    return this.store.peekRecord('package_category', this.get("categoryId"));
  }.property('categoryId'),

  nextItem: function(){
    var currentItem = this.get('model');
    var items = this.get("sortedItems").toArray();
    return items[items.indexOf(currentItem) + 1];
  }.property('model', 'categoryId', 'sortBy'),

  previousItem: function(){
    var currentItem = this.get('model');
    var items = this.get("sortedItems").toArray();
    return items[items.indexOf(currentItem) - 1];
  }.property('model', 'categoryId', 'sortBy'),

  previewUrl: function(key, value) {
    if(arguments.length > 1) {
      return value;
    } else {
      return this.get("model.previewImageUrl");
    }
  }.property("model.previewImageUrl", "model"),

  actions: {
    showPreview: function(image){
      this.set('previewUrl', image.get("previewImageUrl"));
    }
  }

});
