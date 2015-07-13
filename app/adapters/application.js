import config from '../config/environment';
import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  namespace: config.APP.NAMESPACE,
  host:      config.APP.API_HOST_URL,
  headers: function() {
    return {
      "Accept-Language":        "en",
      "X-GOODCITY-APP-NAME":    config.APP.NAME,
      "X-GOODCITY-APP-VERSION": config.APP.VERSION,
      "X-GOODCITY-APP-SHA":     config.APP.SHA
    };
  }.property(),

  // without this, error is wrapped like this {__reason_with_error_thrown__:jqXHR,message:"",stack:""}
  // it does add a stacktrace that would otherwise be missing but only relates to adapter
  // instead of calling code so not that useful
  ajaxError: function(jqXHR) {
    return this._super(jqXHR);
  }
});
