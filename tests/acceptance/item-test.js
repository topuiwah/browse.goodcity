import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'browse/tests/helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import { mockFindAll } from 'ember-data-factory-guy';
import testSkip from 'browse/tests/helpers/test-skip';

var pkgCategory, subcategory1, pkgType1, subcategory2, item_with_packages, prev_item, item, next_item, item_path;

module('Acceptance | Item Page', {
  beforeEach: function() {
    this.application = startApp();

    pkgType1 = FactoryGuy.make("package_type");
    item_with_packages = FactoryGuy.make("received_item");
    next_item = FactoryGuy.make("received_item");
    item = FactoryGuy.make("received_item");
    prev_item = FactoryGuy.make("received_item");
    pkgCategory  = FactoryGuy.make("parent_package_category");
    subcategory1 = FactoryGuy.make("package_category", {parent_id: parseInt(pkgCategory.id), packagr_type_codes: pkgType1.get("code") });
    subcategory2 = FactoryGuy.make("package_category", {parent_id: parseInt(pkgCategory.id), packagr_type_codes: pkgType1.get("code") });

    mockFindAll("package_category").returns({json: {package_categories: [pkgCategory.toJSON({includeId: true}), subcategory1.toJSON({includeId: true}), subcategory2.toJSON({includeId: true})]}});
    mockFindAll("package_type").returns({json: {package_types: [pkgType1.toJSON({includeId: true})]}});
    mockFindAll('item').returns({json: {items: [item_with_packages.toJSON({includeId: true}), next_item.toJSON({includeId: true}), item.toJSON({includeId: true}), prev_item.toJSON({includeId: true})]}});

    item_path = "/item/" + item.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt%3Adesc";
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test("should redirect item page and Display details", function(assert) {
  var item_path = "/item/" + item_with_packages.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt%3Adesc";
  visit(item_path);

  andThen(function() {
    assert.equal(currentURL(), item_path);

    // Display all the associated items
    assert.equal(Ember.$('.main-section .item_name:first').text(), item_with_packages.get('packages.firstObject.notes'));

    // Verify donorCondition
    assert.equal(Ember.$('.main-section .item_details:first').text().indexOf(item_with_packages.get('donorCondition.name')) > 0, true);

    // Verify quantity
    assert.equal(Ember.$('.main-section .item_details:eq(1)').text().indexOf(item_with_packages.get('packages.firstObject.quantity')) > 0, true);

    // verify dimension
    assert.equal(Ember.$('.main-section .item_details:eq(2)').text().indexOf(item_with_packages.get('packages.firstObject.dimensions')) > 0, true);


    // verify packages details length
    assert.equal(Ember.$('.main-section .item_name').length, item_with_packages.get('packages.length'));
  });
});

testSkip("should redirect previous item", function(assert) {
  var prev_item_path = "/item/" + prev_item.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt%3Adesc";

  visit(item_path);

  andThen(function() {
    assert.equal(currentURL(), item_path);

    click("ul.pagination li:first");
    andThen(function(){
      assert.equal(currentURL(), prev_item_path);
    });
  });
});


testSkip("should redirect next item", function(assert) {
  var next_item_path = "/item/" + next_item.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt%3Adesc";

  visit(item_path);

  andThen(function() {
    assert.equal(currentURL(), item_path);

    click("ul.pagination li:last");
    andThen(function(){
      assert.equal(currentURL(), next_item_path);
    });
  });
});
