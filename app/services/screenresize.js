import Ember from 'ember';
import '../computed/local-storage';

export default Ember.Service.extend({
  isSmallScreen: false,

  screenResized: function() {
    return matchMedia(Foundation.media_queries.small).matches &&
      !matchMedia(Foundation.media_queries.medium).matches;
  },

  observeScreen: function() {
    this.set("isSmallScreen", this.screenResized());
  },

  initComponent: function() {
    this.observeScreen();
    var updateScreen = Ember.run.bind(this, this.observeScreen);
    window.addEventListener("resize", updateScreen);
  }.on("init"),

});
