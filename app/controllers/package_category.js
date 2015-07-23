import Ember from 'ember';
export default Ember.Controller.extend({

  queryParams: ["page"],
  page:        1,
  perPage:     12,

  selectedCategory: null,
  selectedSort:     null,
  categoryItems:    Ember.computed.alias("category.items"),

  category: function(key, value){
    return (arguments.length > 1) ? value : this.get('model');
  }.property(),

  sortOptions: function(){
    return [
      { id: 1, selectName: "Newest first", selectValue: "id:desc" },
      { id: 2, selectName: "Oldest first", selectValue: "id" }
    ];
  }.property(),

  sortedItems: function(){
    var selected = this.get("selectedSort");
    var options  = this.get("sortOptions");
    var option   = selected ? options.findBy('id', selected) : options.get('firstObject');

    var sortProperty = option.selectValue.split(":");
    var property     = sortProperty[0];
    var order        = sortProperty[1];

    return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
      sortProperties: [property],
      sortAscending: true,
      sortFunction: function(a,b) {
        if(order){
          return parseInt(b) - parseInt(a);
        } else {
          return parseInt(a) - parseInt(b);
        }
      },
      content: this.get("categoryItems")
    });

  }.property('selectedSort', 'categoryItems', 'category'),

  actions: {
    filterItems() {
      var selectedCategoryId = this.get('selectedCategory');
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
