//import Ember from 'ember';
import itemController from './item';

export default itemController.extend({

  package:           Ember.computed.alias('model'),

  hasQuantityAndIsAvailable: Ember.observer('package.quantity', 'package.isAvailable' function() {
    if(!this.get('package.isAvailable') || !this.get('package.quantity')) {
      this.get('messageBox').alert('Sorry! This item is no longer available.',
      () => {
        this.transitionTo('/browse');
      });
    }
  }),
});
