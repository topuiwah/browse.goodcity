import Ember from 'ember';
import preloadDataMixin from '../mixins/preload_data';

export default Ember.Route.extend(preloadDataMixin, {

  i18n: Ember.inject.service(),

  beforeModel: function() {
    this.set("i18n.locale", this.get("session.language"));
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
