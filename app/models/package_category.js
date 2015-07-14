import Ember from "ember";
import DS from 'ember-data';

var attr = DS.attr;
    // belongsTo = DS.belongsTo;

export default DS.Model.extend({
  parentId: attr('number'),
  name:     attr('string'),

  isParent: Ember.computed.equal("parentId", null),
  isChild: Ember.computed.notEmpty("parentId"),

  childCategories: function() {
    return this.store.filter("package_category", p => p.get("parentId") === parseInt(this.get("id")));
  }.property(),
});
