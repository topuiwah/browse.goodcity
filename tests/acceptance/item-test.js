import Ember from 'ember';
import { module } from 'qunit';
import startApp from 'browse/tests/helpers/start-app';
import {make} from 'ember-data-factory-guy';
import testSkip from 'browse/tests/helpers/test-skip';

var pkgCategory, subcategory1, pkgType1, subcategory2, item_with_packages, prev_item, item, next_item, item_path;

module('Acceptance | Item Page', {
  beforeEach: function() {
    this.application = startApp();

    pkgType1 = make("package_type");
    item_with_packages = make("received_item", { packageType: pkgType1 });
    next_item = make("item", { packageType: pkgType1 });
    item = make("item", { packageType: pkgType1 });
    prev_item = make("item", { packageType: pkgType1 });

    pkgCategory  = make("parent_package_category");
    subcategory1 = make("package_category", {parentId: parseInt(pkgCategory.id), packageTypeCodes: pkgType1.get("code") });
    subcategory2 = make("package_category", {parentId: parseInt(pkgCategory.id), packageTypeCodes: pkgType1.get("code") });

    item_path = "/item/" + item.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt%3Adesc";
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

testSkip("should redirect item page and Display details", function(assert) {
  var item_path = "/item/" + item_with_packages.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt%3Adesc";
  visit(item_path);

  andThen(function() {
    assert.equal(currentURL(), item_path);
    assert.equal(Ember.$('h1.title').text(), "View Item");

    // Display all the associated items
    assert.equal(Ember.$('.main-section .item_name:first').text(), item_with_packages.get('mainPackage.notes'));

    // Verify donorCondition
    assert.equal(Ember.$('.main-section .item_details:first').text().indexOf(item_with_packages.get('donorCondition.name')) > 0, true);

    // Verify quantity
    assert.equal(Ember.$('.main-section .item_details:eq(1)').text().indexOf(item_with_packages.get('mainPackage.quantity')) > 0, true);

    // verify dimension
    assert.equal(Ember.$('.main-section .item_details:eq(2)').text().indexOf(item_with_packages.get('mainPackage.dimensions')) > 0, true);

    // verify category list
    var categoryList = Ember.$('.main-section .item_details:eq(3)').text();
    assert.equal(categoryList.indexOf(pkgType1.get('name')) > 0, true);
    assert.equal(categoryList.indexOf(subcategory1.get('name')) > 0, true);
    assert.equal(categoryList.indexOf(subcategory2.get('name')) > 0, true);

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
