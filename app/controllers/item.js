import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams:    ['categoryId', 'sortBy'],
  categoryId:     null,
  sortBy:         null,
  item:           Ember.computed.alias('model'),
  noNextItem:     Ember.computed.empty('nextItem'),
  noPreviousItem: Ember.computed.empty('previousItem'),
  hideThumbnails: Ember.computed.gt('item.sortedImages.length', 1),
  smallScreenPreviewUrl: Ember.computed.alias('item.displayImage.smallScreenPreviewImageUrl'),

  direction: null,

  allPackages: Ember.computed('item.packages', function(){
    var item = this.get("item");
    return item.get("isItem") ? item.get('packages') : [item];
  }),

  categoryObj: Ember.computed('categoryId' ,function(){
    return this.store.peekRecord('package_category', this.get("categoryId"));
  }),

  selectedSort: Ember.computed('sortBy' ,function() {
    return [this.get("sortBy")];
  }),

  sortedItems: Ember.computed.sort("categoryObj.items", "selectedSort"),

  nextItem: Ember.computed('model', 'sortedItems.[]' ,function(){
    var currentItem = this.get('item');
    var items = this.get("sortedItems").toArray();
    return items[items.indexOf(currentItem) + 1];
  }),

  previousItem: Ember.computed('model', 'sortedItems.[]' ,function(){
    var currentItem = this.get('item');
    var items = this.get("sortedItems").toArray();
    return items[items.indexOf(currentItem) - 1];
  }),

  previewUrl: Ember.computed("item.previewImageUrl", {
    get() {
      return this.get("item.previewImageUrl");
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

        if(targetItem.get("isItem")) {
          this.transitionToRoute('item', targetItem,
            { queryParams: {
              sortBy: this.get("sortBy"),
              categoryId: this.get("categoryId") }
            }
          );
        } else {
          this.transitionToRoute('package', targetItem,
            { queryParams: {
              sortBy: this.get("sortBy"),
              categoryId: this.get("categoryId") }
            }
          );
        }

      }
    },

  }
});
