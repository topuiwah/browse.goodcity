import Ember from 'ember';

export default Ember.Controller.extend({
  showCartDetailSidebar: false,
  packageCategoryReloaded: false,
  flashMessage: Ember.inject.service(),
  queryParams: ['orderCancelled'],
  triggerFlashMessage: false,

  orderCancelled: false,

  cancelOrderFlashMessage: Ember.observer("orderCancelled", 'triggerFlashMessage', function() {
    if(this.get("orderCancelled")) {
      this.get("flashMessage").show("order.flash_cancelled_message");
    }
  }),

  parentCategories: Ember.computed('model.[]', 'packageCategoryReloaded', function() {
    var model = this.get("model");
    model.forEach(packageCategory => {
      packageCategory.toggleProperty("reloadPackageCategory");
    });
    return this.get('model').filterBy('parentId', null);
  })
});
