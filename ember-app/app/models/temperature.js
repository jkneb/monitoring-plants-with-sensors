import Ember from 'ember';

var Temperature = Ember.Object.extend({
  value: '',
  time: ''
});

Temperature.reopenClass({
  findAll() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.getJSON('http://margareth-api.herokuapp.com/api/temperatures')
        .then((res) => resolve(res.temperatures.map((item) => {
          // corrects an an approximate +1° error calibratation
          // and value is rounded to 2 decimal places
          item.value = Math.round((item.value - 1) * 100) / 100;
          return Temperature.create(item);
        })))
        .fail((err) => reject(err));
    });
  }
});

export default Temperature;