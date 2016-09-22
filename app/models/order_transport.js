import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({

  timeslot:      attr('string'),
  transportType: attr('string'),
  vehicleType:   attr('string'),
  scheduledAt:   attr('date'),

  contact:  belongsTo('contact', { async: false }),
  order:    belongsTo('order', { async: false }),

  isGGV: Ember.computed.equal("transportType", "GGV"),

});
