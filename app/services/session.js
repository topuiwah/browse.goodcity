import Ember from 'ember';
import '../computed/local-storage';

export default Ember.Service.extend({
  language: Ember.computed.localStorage(),
});
