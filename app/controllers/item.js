import Ember from 'ember';
export default Ember.Controller.extend({

  previewUrl: function(key, value) {
    if(arguments.length > 1) {
      return value;
    } else {
      return this.get("model.previewImageUrl");
    }
  }.property("model.previewImageUrl"),

  actions: {
    showPreview: function(image){
      this.set('previewUrl', image.get("previewImageUrl"));
    }
  }

});
