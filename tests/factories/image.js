import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('image', {
  sequences: {
    cloudinaryId: function(num) {
      return "1407764294/default/test_image" + num + ".jpg";
    },
  },
  default: {
    cloudinaryId: FactoryGuy.generate('cloudinaryId'),
    favourite: false
  }
});

export default {};
