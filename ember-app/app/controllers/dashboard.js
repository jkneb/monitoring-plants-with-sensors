import Ember from 'ember';

export default Ember.Controller.extend({
  range: 120, // 2 hours

  actions: {
    changeRange(range) {
      this.set('range', range*24*60); // from the interface range unit is days but from the backend range is minutes
    }
  }
});
