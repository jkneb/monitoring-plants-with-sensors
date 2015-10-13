import Ember from 'ember';
import Temperature from '../models/temperature';
import Moisture from '../models/moisture';
import Light from '../models/light';
import Measure from '../models/measure';

export default Ember.Route.extend({
  model: function() {
    return Measure.findAll();
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      moistures: model.map((item) => Moisture.create({'value':item.moisture, 'time':item.time})),
      lights: model.map((item) => Light.create({'value':item.light, 'time':item.time})),
      temperatures: model.map((item) => {
        // corrects an an approximate +1° error calibratation
        // and value is rounded to 2 decimal places
        item.temperature = Math.round((item.temperature - 1) * 100) / 100;
        return Temperature.create({'value':item.temperature, 'time':item.time});
      })
    });
  }
});
