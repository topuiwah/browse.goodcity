import FactoryGuy from 'ember-data-factory-guy';
import './package_type';
import './package';

FactoryGuy.define('item', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
    description: function(num) {
      return 'Donor Description' + num;
    }
  },
  default: {
    id:               FactoryGuy.generate('id'),
    state:            'submitted',
    createdAt:        '12/01/2014',
    updatedAt:        '12/01/2014',
    donorDescription: FactoryGuy.generate("description"),
    donorCondition:   FactoryGuy.belongsTo('donor_condition'),
  },
  item_with_offer: {
    offer: FactoryGuy.belongsTo('offer')
  },
  item_with_type: {
    packageType: FactoryGuy.belongsTo('package_type')
  },
  received_item: {
    offer: FactoryGuy.belongsTo('offer'),
    packageType: FactoryGuy.belongsTo('package_type'),
    packages: function(){ return FactoryGuy.buildList('package', 2, { state: "received" }); }
  }
});

export default {};
