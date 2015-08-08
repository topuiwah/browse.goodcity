import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({

  preloadData: function() {
    var promises = [];
    var retrieve = types => types.map(type => this.store.findAll(type));

    promises = retrieve(config.APP.PRELOAD_TYPES);

    return Ember.RSVP.all(promises);
  }
});
