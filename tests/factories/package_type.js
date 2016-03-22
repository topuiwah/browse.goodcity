import FactoryGuy from 'ember-data-factory-guy';
import './item';

FactoryGuy.define('package_type', {
  sequences: {
    id: (num)=> num + 100,
    name: (num)=> `Category${num}`,
    code: (num)=> `code${num}`
  },
  default: {
    id:   FactoryGuy.generate('id'),
    name: FactoryGuy.generate("name"),
    code: FactoryGuy.generate("code")
  },

  package_type_with_items: {
    items: FactoryGuy.hasMany('item', 2, { state: "accepted" })
  }
});

export default {};
