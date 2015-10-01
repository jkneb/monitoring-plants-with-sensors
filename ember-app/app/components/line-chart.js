import Ember from 'ember';
import Charts from '../mixins/charts';

export default Ember.Component.extend(Charts, {
  classNameBindings: ['chartClassName'],
  classNames: ['line-chart'],
  tagName: 'svg',

  unit: '',

  x: function(){
    return d3.time.scale().range([0, this.get('width')]);
  }.property('data'),
  y: function(){
    return d3.scale.linear().range([this.get('height'), 0]);
  }.property('data'),

  xTicksNbr: 5,
  yTicksNbr: 4,

  xAxis: function(){
    return d3.svg.axis().scale(this.get('x')).orient('bottom').ticks(this.xTicksNbr);
  }.property('x'),
  yAxis: function(){
    return d3.svg.axis().scale(
      this.get('y')).orient('left')
        .ticks(this.yTicksNbr)
        .tickSize(-this.get('width'), 0, 0)
        .tickFormat((d) => `${d} ${this.get('unit')}`
    );
  }.property('y'),


  drawGraph: function(){
    if (!this.resolveWidth()) { return; } // fail fast

    var data = this.get('data'),
        width = this.get('width'),
        height = this.get('height'),
        margin = this.get('margin'),
        x = this.get('x'),
        y = this.get('y');

    // format dates for d3 with moment
    for (var i=0; i<data.length; i++) {
      data[i].d3time = this.parseDate( moment(data[i].time).format('D MMM HH:mm') );
    }

    // set line
    var line = d3.svg.line()
      .x(function(d) { return x(d.d3time); })
      .y(function(d) { return y(d.value); })
      .interpolate('basis'); // linear | basis | bundle | cardinal | monotone

    // set graph
    var svg = d3.select('.'+this.get('chartClassName'))
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .select('.wraper')
        .attr('transform', 'translate('+margin.left+','+margin.top+')');

    x.domain(d3.extent(data, function(d) { return d.d3time; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // x axis
    svg.select('.x.axis')
      .attr('transform', 'translate(0,'+height+')')
      .call(this.get('xAxis'));

    // y axis
    svg.select('.y.axis')
      .call(this.get('yAxis'));
    svg.select('.y.axis').selectAll('line')
      .style('stroke-dasharray', ('3, 3'));
    svg.select('.y.axis').selectAll('text')
      .style('text-anchor', 'start')
      .attr('transform', 'translate(3,12)')
      .attr('fill', 'white')
      .attr('stroke-width', '0');

    // line
    svg.select('.line')
      .datum(data)
      .transition().duration(300)
      .attr('d', line);

  }.observes('data'),


  didInsertElement: function(){
    // order matters!
    this.resolveWidth();
    this.drawGraph();
  }
});