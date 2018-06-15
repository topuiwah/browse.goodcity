import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user',{
  sequences: {
    id: function(num) {
      return num + 100;
    },
    collectionFirstName: function(num) {
      return 'Daniel' + num;
    },
    collectionLastName: function(num) {
      return 'Stepp' + num;
    }
  },
  default: {
    id:        FactoryGuy.generate('id'),
    firstName: FactoryGuy.generate('collectionFirstName'),
    lastName:  FactoryGuy.generate('collectionLastName'),
    userRoles: FactoryGuy.hasMany('user-role'),
    organisations: FactoryGuy.hasMany('organisation'),
  },
});
export default {};
