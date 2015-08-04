import Ember from 'ember';

export default Ember.Component.extend({
  loading: function(key, value){
    return arguments.length > 1 ? true : value;
  }.property(),

  changedSrc: function() {
    if(!this.is_cached(this.get("src"))) {
      this.set("loading", true);
    }
  }.observes("src"),

  onLoad: function() {
    this.set("loading", false);
  },

  is_cached: function(src) {
    var image = new Image();
    image.src = src;
    return image.complete;
  },

  didInsertElement() {
    var updateScreen = Ember.run.bind(this, this.onLoad);
    var image_tag = this.element.getElementsByClassName('cl-item-image')[0];
    image_tag.addEventListener("load", updateScreen);
  },

  willDestroyElement() {
    var image_tag = this.element.getElementsByClassName('cl-item-image')[0];
    image_tag.removeEventListener("load");
  },
});
