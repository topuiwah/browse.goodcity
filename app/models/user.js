import attr from 'ember-data/attr';
import Ember from 'ember';
import Addressable from './addressable';

export default Addressable.extend({
  firstName:   attr('string'),
  lastName:    attr('string'),
  mobile:      attr('string'),
  createdAt:   attr('date'),

  mobileWithoutCountryCode: Ember.computed('mobile', function(){
    var mobile = this.get('mobile');
    return mobile ? ((mobile.includes("+852")) ? mobile.substring('4') : mobile) : '';
  }),

  fullName: Ember.computed('firstName', 'lastName', function(){
    return (this.get('firstName') + " " + this.get('lastName'));
  }),
});
