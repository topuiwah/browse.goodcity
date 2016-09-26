import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  setupController(controller) {
    this._super(...arguments);
    controller.set('blankPurpose', false);
  }

});
