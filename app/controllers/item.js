import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams:    ['categoryId', 'sortBy'],
  categoryId:     null,
  sortBy:         null,
  noNextItem:     Ember.computed.empty('nextItem'),
  noPreviousItem: Ember.computed.empty('previousItem'),
  hideThumbnails: Ember.computed.gt('model.sortedImages.length', 1),
  smallScreenPreviewUrl: Ember.computed.alias('model.displayImage.smallScreenPreviewImageUrl'),

  direction: null,

  categoryObj: Ember.computed('categoryId' ,function(){
    return this.store.peekRecord('package_category', this.get("categoryId"));
  }),

  selectedSort: Ember.computed('sortBy' ,function() {
    return [this.get("sortBy")];
  }),

  sortedItems: Ember.computed.sort("categoryObj.items", "selectedSort"),

  nextItem: Ember.computed('model', 'sortedItems' ,function(){
    var currentItem = this.get('model');
    var items = this.get("sortedItems").toArray();
    return items[items.indexOf(currentItem) + 1];
  }),

  previousItem: Ember.computed('model', 'sortedItems' ,function(){
    var currentItem = this.get('model');
    var items = this.get("sortedItems").toArray();
    return items[items.indexOf(currentItem) - 1];
  }),

  previewUrl: Ember.computed("model.previewImageUrl", "model", {
    get() {
      return this.get("model.previewImageUrl");
    },
    set(key, value) {
      return value;
    }
  }),

  actions: {
    showPreview(image) {
      this.set('previewUrl', image.get("previewImageUrl"));
    },

    setDirectionAndRender(direction) {
      this.set('direction', direction);
      var targetItem = direction === "moveRight" ? this.get("previousItem") : this.get("nextItem");

      if(targetItem) {
        this.transitionToRoute('item', targetItem,
          { queryParams: {
            sortBy: this.get("sortBy"),
            categoryId: this.get("categoryId") }
          }
        );
      }
    },

  }
});
