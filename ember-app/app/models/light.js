import Ember from 'ember';

var Light = Ember.Object.extend({
  value: '',
  time: ''
});

Light.reopenClass({
  findAll() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.getJSON('http://margareth-api.herokuapp.com/api/lights')
        .then((res) => resolve(res.lights.map((item) => Light.create(item))))
        .fail((err) => reject(err));
    });
  }
});

export default Light;