import DS from 'ember-data';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  name: attr('string'),
  mobile: attr('string'),
  address: belongsTo('address', { async: false }),
});
