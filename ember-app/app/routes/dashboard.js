import Ember from 'ember';
import Temperature from '../models/temperature';
import Moisture from '../models/moisture';
import Light from '../models/light';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      temperatures: Temperature.findAll(),
      moistures   : Moisture.findAll(),
      lights      : Light.findAll()
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      temperatures: model.temperatures,
      moistures   : model.moistures,
      lights      : model.lights
    });
  }
});
