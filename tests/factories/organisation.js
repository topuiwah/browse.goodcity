import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('orders_package',{
  sequences: {
    id: function(num) {
      return num + 100;
    }
  },
  default: {
    id:            FactoryGuy.generate('id'),
    nameEn:        'Crossroads',
    descriptionEn: 'Foundation'
  }
});
export default {};
