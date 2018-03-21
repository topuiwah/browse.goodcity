import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('orders_package',{
  sequences: {
    id: function(num) {
      return num + 100;
    }
  },
  default: {
    id:              FactoryGuy.generate('id'),
    user:            FactoryGuy.belongsTo('user'),
    role:     FactoryGuy.belongsTo('role')
  }
});
export default {};
