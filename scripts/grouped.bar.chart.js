/* Sample Code Source: http://bl.ocks.org/mbostock/3887051 */

/*Variables*/
var x1 = d3.scale.ordinal();

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

/* Calling functions for creating graphs */
createGroupedBarGraph("div#grouped-bar-HCI", "HCI_Top10.csv");
createGroupedBarGraph("div#grouped-bar-SE", "SE_Top10.tsv");
createGroupedBarGraph("div#grouped-bar-CSCW", "CSCW_Top10.tsv");
	
/*Functions*/
function createGroupedBarGraph(barID, dataset) {
	var svg = d3.select(barID).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv(dataset, function(error, data) {
  var facultyRank = d3.keys(data[0]).filter(function(key) { return key !== "school" && 
																								   key !== "overall_rank" &&
																								   key !== "overall_h_index_score" &&
																								   key !== "overall_h-index" &&
																								   key !== "rank_by_individual" &&
																								   key !== "rank_by_individual_h_index_score" &&
																								   key !== "rank_by_individual_h_index" &&
																								   key !== "num_of_faculty"; });

  data.forEach(function(d) {
    d.rankings = facultyRank.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x.domain(data.map(function(d) { return d.school; }));
  x1.domain(facultyRank).rangeRoundBands([0, x.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.rankings, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Rankings By Individual");

  var school = svg.selectAll(".school")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.school) + ",0)"; });

  school.selectAll("rect")
      .data(function(d) { return d.rankings; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });
   });
}
