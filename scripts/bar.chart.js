/* Variables */
var margin = {top: 50, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
	.ticks([15]);
	
var barTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Overall Score:</strong> <span style='color:cyan'>" + d.overall_h-index_score + "</span>";
  })
  
 var groupedBarTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Faculty Score:</strong> <span style='color:cyan'>" + d.overall_h-index_score + "</span>";
  })

  
 /* Calling functions for creating graphs */
 createBarGraph("div#bar-graph1", "HCI_Top10.tsv");

 
 /* Functions */
function createBarGraph(barID, dataset){
	var svg = d3.select(barID).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(barTip);

d3.tsv(dataset, function(error, data) {
  x.domain(data.map(function(d) { return d.university; }));
  y.domain([0, 100]);//d3.max(data, function(d) { return d.overall_h-index_score; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
	
  svg.append("g")
      .attr("class", "y axis")
	  .attr("transform", "translate(-10,0)")
      .call(yAxis)
    .append("text")
	  .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Score");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.university); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.overall_h-index_score); })
      .attr("height", function(d) { return height - y(d.overall_h-index_score); })
      .on('mouseover', barTip.show)
      .on('mouseout', barTip.hide)

	});
}

function type(d) {
  d.overall_h-index_score = +d.overall_h-index_score;
  return d;
}