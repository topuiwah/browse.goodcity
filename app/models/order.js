import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({

  code: attr('string'),
  state: attr('string'),
  purposeDescription: attr('string'),
  ordersPackages: hasMany("orders_packages", { async: false }),
  orderTransport: belongsTo('order_transport', { async: false }),
  organisation: belongsTo('organisation', { async: false }),
  createdById:      belongsTo('user', { async: false }),
  createdAt:        attr('date'),
  updatedAt:        attr('date'),

  orderItems: Ember.computed('ordersPackages.[]', function() {
    var items = [];
    this.get('ordersPackages').forEach(function(record) {
      if(record) {
        var pkg = record.get('package');
        if (pkg.get('hasSiblingPackages')) {
          items.push(pkg.get('item'));
        } else {
          items.push(pkg);
        }
      }
    });
    return items.uniq();
  })

});
