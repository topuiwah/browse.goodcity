import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'browse/tests/helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';

var pkgCategory, subcategory1, pkgType1, pkgType2, subcategory2, latestItem, oldItem;

module('Acceptance | Category Page', {
  beforeEach: function() {
    this.application = startApp();

    pkgType1     = FactoryGuy.make("package_type_with_items");
    pkgType2     = FactoryGuy.make("package_type_with_items");
    pkgCategory  = FactoryGuy.make("parent_package_category");
    subcategory1 = FactoryGuy.make("package_category", {parentId: parseInt(pkgCategory.id), packageTypeCodes: pkgType1.get("code") });
    subcategory2 = FactoryGuy.make("package_category", {parentId: parseInt(pkgCategory.id), packageTypeCodes: pkgType2.get("code") });

    latestItem = pkgType2.get("items.lastObject");
    oldItem = pkgType1.get("items.firstObject");
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test("should redirect Category page and Display details", function(assert) {
  visit("/category/" + pkgCategory.id);

  andThen(function() {
    assert.equal(currentURL(), "/category/" + pkgCategory.id);
    assert.equal(Ember.$('h1.title').text(), pkgCategory.get("name"));

    // Display all the associated items
    assert.equal(Ember.$('.main-section ul.items_list li a').length, 4);

    // Verify selected filter options
    assert.equal(Ember.$('.main-section select:first').find(":selected").text(), "All");
    assert.equal(Ember.$.trim(Ember.$('.main-section select:last').find(":selected").text()), "Newest first");
  });
});

test("should filter items based on subcategory", function(assert) {
  var subcategory_title = subcategory1.get('name') + " ("+ subcategory1.get("items.length") +")";

  visit("/category/" + pkgCategory.id);

  andThen(function() {
    // Display all the associated items
    assert.equal(Ember.$('.main-section select:first').find(":selected").text(), "All");
    assert.equal(Ember.$('.main-section ul.items_list li a').length, 4);

    Ember.run(function() {
      var categoryId = find('.main-section select:first option:contains('+ subcategory_title +')').val();
      Ember.$('.main-section select:first').val(categoryId).change();
    });

    andThen(function() {
      // Verify selected filter options
      assert.equal(Ember.$.trim(Ember.$('.main-section select:first').find(":selected").text()), subcategory_title);
      assert.equal(Ember.$('.main-section ul.items_list li a').length, 2);
    });

  });
});

test("should filter items based on new-old items", function(assert) {
  visit("/category/" + pkgCategory.id);

  andThen(function() {
    // Display all the associated items
    assert.equal(Ember.$.trim(Ember.$('.main-section select:last').find(":selected").text()), "Newest first");
    assert.equal(Ember.$('.main-section ul.items_list li a:first').attr('href'), "/item/"+ latestItem.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt%3Adesc");

    Ember.run(function() {
      var categoryId = find('.main-section select:last option:contains("Oldest first")').val();
      Ember.$('.main-section select:last').val(categoryId).change();
    });

    andThen(function() {
      // Verify selected filter options
      assert.equal(Ember.$.trim(Ember.$('.main-section select:last').find(":selected").text()), "Oldest first");
      assert.equal(Ember.$('.main-section ul.items_list li a:first').attr('href'), "/item/"+ oldItem.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt");
    });

  });
});
