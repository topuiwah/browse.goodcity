import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import {make} from 'ember-data-factory-guy';
import { mockFindAll } from 'ember-data-factory-guy';
import FactoryGuy from 'ember-data-factory-guy';

var App, packageData,oldItem, pkgCategory, subcategory1, pkg, pkgType1, pkgType2, subcategory2, order, orders_package, orders_package1, gogo_van;

module('Acceptance | Cart Page', {
  beforeEach: function() {
    App = startApp();
    pkgType1     = make("package_type_with_packages");
    pkgType2     = make("package_type_with_packages");
    pkgCategory  = make("parent_package_category");
    subcategory1 = make("package_category", {parentId: parseInt(pkgCategory.id), packageTypeCodes: pkgType1.get("code") });
    subcategory2 = make("package_category", {parentId: parseInt(pkgCategory.id), packageTypeCodes: pkgType2.get("code") });

    order = make("order");
    orders_package = make("orders_package");
    orders_package1 = make("orders_package");
    gogo_van = make("gogovan_transport");

    packageData = { "package": [
        {"id":20824,"quantity":1,"length":21,"width":23,"height":67,"notes":"Bikes","item_id":975,"created_at":"2016-09-14T08:09:24.649187","updated_at":"2017-06-30T10:53:48.639188","package_type_id":1611,"grade":"B","donor_condition_id":1,"stockit_sent_on":null,"order_id":1611,"allow_web_publish":true,"image_ids":[1108]}],
        "package_types": [{id: 44, name: "Range hood", code: "EKH", other_terms: null, visible_in_selects: true}]
    };

    $.mockjax({url: "/api/v1/browse/fetch_packages",responseText: packageData });

    mockFindAll("gogovan_transport").returns({json: {gogovan_transports: [gogo_van.toJSON({includeId: true})]}});

    var data = {"user_profile": [{"id": 2,"first_name": "David", "last_name": "Dara51", "mobile": "61111111", "user_role_ids": [1]}], "users": [{"id": 2,"first_name": "David", "last_name": "Dara51", "mobile": "61111111"}], "roles": [{"id": 4, "name": "Supervisor"}], "user_roles": [{"id": 1, "user_id": 2, "role_id": 4}]};
    $.mockjax({url:"/api/v1/auth/current_user_profil*",
      responseText: data });

    mockFindAll("order").returns({
      json:
        {orders: [order.toJSON({includeId: true})],
        orders_packages: [orders_package.toJSON({includeId: true}), orders_package1.toJSON({includeId: true})]}
      });
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }
});


test("delete orders_packages from orders in draft", function(assert){
  visit("/item/"+ pkgType1.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt");
  andThen(function() {
    assert.equal(currentURL(), "/item/"+ pkgType1.id +"?categoryId="+ pkgCategory.id +"&sortBy=createdAt");
    $(".button.request-item").click();
    $(".show_cart_link").click();
    $(".button.expand")[1].click();
    andThen(function(){
      assert.equal(currentURL(), "/order_details");
      click('#purpose_1');
      andThen(function(){
        //$("#purpose_1").prop('checked', true);
        $("#description").val("Test");
        $("#submit_pin").click();
        andThen(function(){
          assert.equal(currentURL(), "/transport_details");
          // $('.order_button a:first').click();
          // andThen(function(){
          //   assert.equal(currentURL(),"/cart");
          // })
        });
      });
    });
  });
});
