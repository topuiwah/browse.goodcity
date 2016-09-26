import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({

  code: attr('string'),
  state: attr('string'),
  purposeDescription: attr('string'),
  ordersPackages: hasMany("orders_packages", { async: false }),
  orderTransport: belongsTo('order_transport', { async: false }),
  createdAt:        attr('date'),
  updatedAt:        attr('date'),

  orderItems: Ember.computed('ordersPackages.[]', function() {
    var items = [];
    this.get('ordersPackages').forEach(function(record) {
      var pkg = record.get('package');
      if (pkg.get('hasSiblingPackages')) {
        items.push(pkg.get('item'));
      } else {
        items.push(pkg);
      }
    });
    return items.uniq();
  }),

});
