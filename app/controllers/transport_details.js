import Ember from 'ember';

export default Ember.Controller.extend({
  selectedDate: null,
  selectedTime: null,

  timeSlots: Ember.computed(function(){
    return [
      {id: "1", name: "10:30AM-1PM"},
      {id: "2", name: "2PM-4PM"},
    ];
  }),
});
