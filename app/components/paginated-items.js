import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Component.extend({

  pagedContent:      pagedArray('content', {perPageBinding: "perPage"}),
  pageBinding:       "pagedContent.page",
  totalPagesBinding: "pagedContent.totalPages",

  showPaginationBar: function() {
    return this.get('pagedContent.totalPages') > 1;
  }.property('pagedContent.totalPages'),

});