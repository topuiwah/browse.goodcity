import Ember from 'ember';
import itemController from './item';

export default itemController.extend({

  messageBox:           Ember.inject.service(),
  package:              Ember.computed.alias('model'),
  pkgNotAvailableShown: false,

  hasQuantityAndIsAvailable: Ember.observer('package.isAvailable', 'package.orderId', 'package.isUnavailableAndDesignated', function() {
    var currentPath = this.get('target').currentPath;
    var isPkgAvailable = this.get('package.isUnavailableAndDesignated');
    if((currentPath === 'package' || currentPath === "package_category" ) && !isPkgAvailable && isPkgAvailable !== null && !this.get('pkgNotAvailableShown')) {
      this.set('pkgNotAvailableShown', true);
      this.get('messageBox').alert('Sorry! This item is no longer available.',
      () => {
        this.set('pkgNotAvailableShown', false);
        this.transitionToRoute('/browse');
      });
    }
  })
});
