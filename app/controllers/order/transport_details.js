import Ember from 'ember';

export default Ember.Controller.extend({
  order: Ember.computed.alias("model.order"),
});
