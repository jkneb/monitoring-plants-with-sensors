import Ember from 'ember';

var Moisture = Ember.Object.extend({
  value: '',
  time: ''
});

Moisture.reopenClass({
  findAll() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      // provide your own API URL here
      Ember.$.getJSON('http://your-heroku-api.herokuapp.com/api/moistures')
        .then((res) => resolve(res.moistures.map((item) => Moisture.create(item))))
        .fail((err) => reject(err));
    });
  }
});

export default Moisture;