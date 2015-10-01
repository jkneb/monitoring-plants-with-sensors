import Ember from 'ember';

export default Ember.Controller.extend({
  dashboardController: Ember.inject.controller('dashboard'),
  range: Ember.computed.reads('dashboardController.range'),

  filteredContent: Ember.computed('range', function() {
    return this.get('model').filter((item, index, collection) => {
      return index >= collection.get('length') - this.get('range');
    }).reverse();
  }),

  tenLastFilteredContent: Ember.computed('filteredContent', function() {
    return this.get('model').filter((item, index, collection) => {
      return index >= collection.get('length') - 10;
    }).reverse();
  }),

  lastEntrie: function() {
    return this.get('model')[this.get('model.length')-1];
  }.property()
});
