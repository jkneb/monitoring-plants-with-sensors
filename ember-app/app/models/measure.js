import Ember from 'ember';

var Measure = Ember.Object.extend({
  value: '',
  time: ''
});

Measure.reopenClass({
  findAll() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.getJSON('http://your-api.herokuapp.com/api/measures') // your own API's url here
        .then((res) => resolve(res.measures.map((item) => Measure.create(item))))
        .fail((err) => reject(err));
    });
  }
});

export default Measure;