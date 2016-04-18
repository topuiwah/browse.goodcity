import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr,
  hasMany = DS.hasMany;

export default DS.Model.extend({
  name:  attr('string'),
  code:  attr('string'),
  items: hasMany('item'),

  _packageCategories: Ember.computed(function() {
    return this.store.peekAll("package_category");
  }),

  packageCategories: Ember.computed('code', "_packageCategories.[]", function(){
    return this.get("_packageCategories").filter(p => p.get("packageTypeCodes") && p.get("packageTypeCodes").indexOf(this.get("code")) > -1);
  }),

  allPackageCategories: Ember.computed('code', "_packageCategories.[]", function(){
    var categories = this.get('packageCategories').toArray();
    this.get('packageCategories').forEach(function(pkg){
      var parentCategory = pkg.get('parentCategory');
      if(parentCategory) { categories = categories.concat(parentCategory); }
    });

    // to remove dupliacte occurences
    return categories.filter(function(item, pos) {
      return categories.indexOf(item) === pos;
    });
  }),

});
