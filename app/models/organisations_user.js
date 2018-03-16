import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({

  userId:          attr('number'),
  organisationId:  attr('number'),
  position:        attr('string'),
  user:            belongsTo('user', { async: false }),
  organisation:    belongsTo('organisation', { async: false })
});
