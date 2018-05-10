import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Login', {
  beforeEach: function() {
    App = startApp({}, 2);

    var data = {"user_profile": [{"id": 2,"first_name": "David", "last_name": "Dara51", "mobile": "61111111", "user_role_ids": [1]}], "users": [{"id": 2,"first_name": "David", "last_name": "Dara51", "mobile": "61111111"}], "roles": [{"id": 4, "name": "Supervisor"}], "user_roles": [{"id": 1, "user_id": 2, "role_id": 4}]};

    $.mockjax({url:"/api/v1/auth/current_user_profil*",
      responseText: data });

    window.localStorage.removeItem('authToken');

  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test("User able to enter mobile number and get the sms code", function(assert) {
  assert.expect(1);
  $.mockjax({url:"/api/v1/auth/send_pi*",responseText:{
    "otp_auth_key" : "/JqONEgEjrZefDV3ZIQsNA=="
  }});
  visit('/login');
  fillIn('#mobile', "61111111");
  triggerEvent('#mobile', 'blur');
  click("#getsmscode");

  andThen(function() {
    assert.equal(currentURL(), "/authenticate");
  });
});

test("User is able to resend the sms code, submit pin and logout", function(assert) {
  assert.expect(4);

  $.mockjax({url:"/api/v1/auth/send_pi*",responseText:{
    "otp_auth_key" : "/JqONEgEjrZefDV3ZIQsNA=="
  }});

  visit('/authenticate');

  andThen(function() {
    click("#resend-pin");
  });

  andThen(function() {
    assert.equal(window.localStorage.otpAuthKey, '"/JqONEgEjrZefDV3ZIQsNA=="');
  });

  $.mockjax({url:"/api/v1/auth/verif*",responseText:{
    "jwt_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJpYXQiOjE1MjU5MjQ0NzYsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjEzNTI1OTI0NDc2fQ.lO6AdJtFrhOI9VaGRR55Wq-YWmeNoLagZthsIW39b2k"
  }});

  var authToken = '"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE1MTg3NzI4MjcsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjE1MTk5ODI0Mjd9.WdsVvss9khm81WNScV5r6DiIwo8CQfHM1c4ON2IACes"';

  andThen(function() {
    fillIn('#pin', "1234");
    triggerEvent('#pin', 'blur');
  });


  andThen(function() {
    assert.equal(find('#pin').val().length, 4);
    window.localStorage.authToken = authToken;
  });

  andThen(function() {
    visit("/");
  });

  andThen(function() {
    click("a:contains('Logout')");
  });

  andThen(function() {
    assert.equal(currentURL(), "/browse");
  });

  andThen(function() {
    assert.equal(typeof window.localStorage.authToken, "undefined");
  });

});


