import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('package_type', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
    name: function(num) {
      return 'Category' + num;
    },
    code: function(num) {
      return num;
    }
  },
  default: {
    id:   FactoryGuy.generate('id'),
    name: FactoryGuy.generate("name"),
    code: FactoryGuy.generate("code")
  }
});

export default {};
