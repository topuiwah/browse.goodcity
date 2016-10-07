import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({

  district: belongsTo('district', { async: false }),

  addressableType: attr('string'),
  addressable: belongsTo('addressable', { polymorphic: true, async: false }),

});
