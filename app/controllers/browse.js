import Ember from 'ember';

export default Ember.Controller.extend({
  showCartDetailSidebar: false,
  packageCategoryReloaded: false,

  parentCategories: Ember.computed('model.[]', 'packageCategoryReloaded', function() {
    var model = this.get("model");
    model.forEach(packageCategory => {
      packageCategory.toggleProperty("reloadPackageCategory");
    });
    return this.get('model').filterBy('parentId', null);
  })
});
