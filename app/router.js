import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("browse");
  this.route('package_category', { path: '/category/:id' });
  this.route('item', { path: '/item/:id' });
});

export default Router;
