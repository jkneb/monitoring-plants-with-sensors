import Ember from 'ember';

var Temperature = Ember.Object.extend({
  value: '',
  time: ''
});

Temperature.reopenClass({
  findAll() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      // provide your own API URL here
      Ember.$.getJSON('http://your-heroku-api.herokuapp.com/api/temperatures')
        .then((res) => resolve(res.temperatures.map((item) => Temperature.create(item))))
        .fail((err) => reject(err));
    });
  }
});

export default Temperature;