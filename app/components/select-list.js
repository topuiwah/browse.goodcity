import Ember from "ember";

export default Ember.Component.extend({
  content: null,
  selectedValue: null,

  actions: {
    change() {
      const changeAction  = this.get('action');
      const selectedEl    = this.$('select')[0];
      const selectedIndex = selectedEl.selectedIndex;
      const content       = this.get('content');
      const hasPrompt     = this.get("prompt");
      var selectedValue;

      if(selectedIndex > 0) {
        var index     = hasPrompt ? (selectedIndex - 1) : selectedIndex;
        selectedValue = content[index].id;
      } else {
        selectedValue = null;
      }

      this.set('selectedValue', selectedValue);
      changeAction(selectedValue);

      if(this.get('targetActionName')) {
        this._controller.send(this.get('targetActionName'));
      }
    }
  }
});
