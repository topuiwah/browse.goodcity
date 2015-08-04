import Ember from "ember";

export default Ember.Component.extend({
  content: null,
  selectedValue: null,

  actions: {
    change() {
      const changeAction  = this.get('on-change');
      const selectedIndex = this.$('select').prop('selectedIndex');
      var content         = this.get('content');
      if (this.get("prompt")) { content = [{value:null}].concat(content); }
      const selectedValue = content[selectedIndex].value;

      this.set('selectedValue', selectedValue);
      changeAction(selectedValue);
    }
  }
});
