import DS from 'ember-data';

var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({

  code: attr('string'),
  state: attr('string'),
  purposeDescription: attr('string'),
  ordersPackages: hasMany("orders_packages", { async: false }),
  orderTransport: belongsTo('order_transport', { async: false }),


});
