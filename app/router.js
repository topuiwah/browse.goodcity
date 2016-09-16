import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("browse");
  this.route('package_category', { path: '/category/:id' });
  this.route('item', { path: '/item/:id' });
  this.route('package', { path: '/package/:id' });
  this.route('login');
  this.route('authenticate');
});

export default Router;
