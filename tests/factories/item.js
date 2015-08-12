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
    },
    date: function(num) {
      var date = new Date();
      date.setSeconds(num);
      return date;
    }
  },
  default: {
    id:               FactoryGuy.generate('id'),
    state:            'accepted',
    createdAt:        FactoryGuy.generate('date'),
    updatedAt:        (new Date()),
    donorDescription: FactoryGuy.generate("description"),
    donorCondition:   FactoryGuy.belongsTo('donor_condition'),
  },
  item_with_type: {
    packageType: FactoryGuy.belongsTo('package_type')
  },
  received_item: {
    packageType: FactoryGuy.belongsTo('package_type'),
    packages: function(){ return FactoryGuy.buildList('package', 2, { state: "received" }); }
  }
});

export default {};
