import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({

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
  needCarry: attr("boolean")

});
