import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  reference: function() {
    var classes = this.get('class');
    return `#${classes.w().length > 1 ? classes.w()[1] : classes}`;
  }.property()
});
