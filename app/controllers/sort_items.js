import Ember from 'ember';
export default Ember.Controller.extend({

  categoryItems: Ember.computed.alias("category.items"),

  sortOptions: function(){
    return [
      { id: 1, selectName: "Newest first", selectValue: "id:desc" },
      { id: 2, selectName: "Oldest first", selectValue: "id" }
    ];
  }.property(),

  sortedItems: function(){
    this.set('page', 1);
    var selected = this.get("selectedSort");
    var options  = this.get("sortOptions");
    var option   = selected ? options.findBy('id', parseInt(selected)) : options.get('firstObject');

    var sortProperty = option.selectValue.split(":");
    var order        = sortProperty[1];

    return this.get("categoryItems").sort(function(a,b) {
      if(order){
        return parseInt(b.get('id')) - parseInt(a.get('id'));
      } else {
        return parseInt(a.get('id')) - parseInt(b.get('id'));
      }
    });
  }.property('selectedSort', 'categoryItems', 'category'),

});
