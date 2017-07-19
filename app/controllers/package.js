import Ember from 'ember';
import itemController from './item';

export default itemController.extend({

  messageBox:        Ember.inject.service(),
  package:           Ember.computed.alias('model'),

  hasQuantityAndIsAvailable: Ember.observer('package.isAvailable', 'package.orderId', 'package.isUnavailableAndDesignated', function() {
    if(this.get('target').currentPath === 'package' && (!this.get('package.isAvailable') || !this.get('package.isUnavailableAndDesignated'))) {
      this.get('messageBox').alert('Sorry! This item is no longer available.',
      () => {
        this.transitionToRoute('/browse');
      });
    }
  })
});
