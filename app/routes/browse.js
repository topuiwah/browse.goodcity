import PublicRoute from './browse_pages';

export default PublicRoute.extend({
  previousRoute: false,

  beforeModel() {
    this._super(...arguments);
    var previousRoutes = this.router.router.currentHandlerInfos;
    var previousRoute = previousRoutes && previousRoutes.pop();

    if(previousRoute)
    {
      if(previousRoute.name === "cart") {
        this.set('previousRoute', true);
      }
    }
  },

  model() {
    return this.store.peekAll('package_category');
  },

  setupController(controller, model){
    if(this.get('previousRoute')) {
      controller.set('showCartDetailSidebar', false);
    }
    controller.set('model', model);
    controller.toggleProperty("triggerFlashMessage");
    this.controllerFor('application').set('pageTitle', this.get('i18n').t("browse.title"));
  }
});
