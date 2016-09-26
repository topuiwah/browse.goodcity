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
  gogovanTransport:    belongsTo('gogovan_transport', { async: false }),

  isGGV: Ember.computed.equal("transportType", "ggv"),

  needEnglish: attr("boolean"),
  needCart: attr("boolean"),
  needCarry: attr("boolean"),

});
