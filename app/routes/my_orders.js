import PublicRoute from './browse_pages';

export default PublicRoute.extend({
  model() {
    return this.store.peekAll('order');
  },
});
