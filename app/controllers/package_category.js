import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["page"],
  page:        1,
  perPage:     12,
  selectedSort: null,

  sortOptions: function() {
    return [
      { name: this.get('i18n').t('category.sort.newfirst'), value: ["createdAt:desc"] },
      { name: this.get('i18n').t('category.sort.oldfirst'), value: ["createdAt"] }
    ];
  }.property(),

  sortedItems: Ember.computed.sort("categoryObj.items", "selectedSort"),

  selectedCategoryId: null,
  currentCategoryId: Ember.computed.alias('categoryObj.id'),

  categoryObj: function() {
    this.set("page", 1);
    var selectedCategoryId = this.get('selectedCategoryId');
    return selectedCategoryId ?
      this.store.peekRecord('package_category', selectedCategoryId) :
      this.get('model');
  }.property('selectedCategoryId', 'model'),

  selectCategories: function() {
    return this.get("model.childCategories").map(c => ({
      name: c.get("nameItemsCount"),
      value: c.get("id")
    }));
  }.property("model")
});
