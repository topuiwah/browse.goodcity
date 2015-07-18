import Ember from 'ember';
import preloadDataMixin from '../mixins/preload_data';

export default Ember.Route.extend(preloadDataMixin, {

  beforeModel: function() {
    return this.preloadData();
  },

  renderTemplate: function() {
    this.render();
    this.render('sidebar', {
      into: 'application',
      outlet: 'sidebar'
    });
  },
});
