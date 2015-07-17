import Ember from 'ember';
import preloadDataMixin from '../mixins/preload_data';

export default Ember.Route.extend(preloadDataMixin, {

  beforeModel: function() {
    var _this = this;
    return this.preloadData().then(function(){
      _this.transitionTo('browse');
    });
  },

  renderTemplate: function() {
    this.render();
    this.render('sidebar', {
      into: 'application',
      outlet: 'sidebar'
    });
  },
});
