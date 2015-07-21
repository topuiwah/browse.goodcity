import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Component.extend({

  totalPagesBinding: "pagedContent.totalPages",
  pagedContent:      pagedArray('content', {pageBinding: "page", perPageBinding: "perPage"}),

  showPaginationBar: function() {
    return this.get('pagedContent.totalPages') > 1;
  }.property('pagedContent.totalPages'),

});
