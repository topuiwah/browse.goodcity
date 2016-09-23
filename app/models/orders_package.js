import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({

  quantity: attr('number'),
  state:    attr('string'),
  package:  belongsTo('package', { async: false }),
  order:    belongsTo('order', { async: false }),

});
