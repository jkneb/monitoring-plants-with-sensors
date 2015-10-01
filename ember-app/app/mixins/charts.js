import Ember from 'ember';

export default Ember.Mixin.create({
  margin: function(){
    return { top: 20, right: 20, bottom: 20, left: 20 };
  }.property(),

  resolveWidth: function(){
    return !Ember.isNone(this.$()) ? this.$().parent().width() : null;
  },
  width: function(){
    var margin = this.get('margin');
    return this.resolveWidth() - margin.left - margin.right;
  }.property(),
  height: function(){
    var margin = this.get('margin');
    return 200 - margin.top - margin.bottom;
  }.property(),

  parseDate: d3.time.format('%d %b %H:%M').parse
});
