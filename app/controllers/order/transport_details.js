import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';
const { getOwner } = Ember;

export default Ember.Controller.extend({
  order: Ember.computed.alias("model.order"),

  selectedDate: null,
  selectedTime: null,
  selectedId: null,

  isSelfSelected: Ember.computed.equal("selectedId", "self"),

  availableDates: Ember.computed({
    get: function() {
      new AjaxPromise("/available_dates", "GET", this.get('session.authToken'), {schedule_days: 40})
        .then(data => this.set("availableDates", data));
    },
    set: function(key, value) {
      return value;
    }
  }),

  timeSlots: Ember.computed(function(){
    return [
      {value: "1", name: "10:30AM-1PM"},
      {value: "2", name: "2PM-4PM"},
    ];
  }),

  actions: {
    bookSchedule() {
      var controller = this;
      var loadingView = getOwner(this).lookup('component:loading').append();
      var transportType = controller.get("selectedId");
      var selectedSlot = controller.get('selectedTime');
      var slotName = controller.get('timeSlots').filterBy('value', selectedSlot).get('firstObject.name');

      var scheduleDetails = {
        scheduled_at:   controller.get('selectedDate'),
        timeslot:       slotName,
        transport_type: transportType,
        order_id:       this.get("order.id") };

      new AjaxPromise("/order_transports", "POST", this.get('session.authToken'), { order_transport: scheduleDetails })
        .then(data => {
          this.get("store").pushPayload(data);
          loadingView.destroy();
          this.transitionToRoute("order.confirm", this.get("order.id"));
        });
    },
  }
});
