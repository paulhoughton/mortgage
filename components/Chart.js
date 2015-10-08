import React, {Component} from 'react';
import '!style!css!./Chart.css';

const margin = {top: 20, right: 20, bottom: 30, left: 75},
	fullWidth = 800,
	fullHeight = 300,
	width = fullWidth - margin.left - margin.right,
	height = fullHeight - margin.top - margin.bottom;

export default class Chart extends Component {

    render() {
		return (<svg ref="chart"></svg>)
	}

	shouldComponentUpdate(props){
		this.redraw.call(this, props);
		return false;
	}

	componentDidMount() {
		d3.select(this.refs.chart)
			.attr("width", "100%")
			.attr("height", fullHeight)
			.attr('viewBox',`0 0 ${fullWidth} ${fullHeight}`)
			.attr('preserveAspectRatio','xMidYMid')
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);
			
		this.redraw.call(this, this.props);
	}	
	
	redraw({data}) {
		var svg = d3.select(this.refs.chart).select("g");

		var x = d3.scale.linear()
			.range([0, width]);

		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.ticks(Math.min(data.length,30))
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

		var line = d3.svg.line()
			.x((d,i)=>x(i+((d.partial/12)||1)-1))
			.y(d=>y(d.balance));
			
		var baseline = d3.svg.line()
			.x((d,i)=>x(i))
			.y(d=>y(d.baseline));

		  x.domain([0,data.length-1])
		  y.domain([0,data[0].balance]);

		  svg.selectAll(".axis").remove();
		  svg.selectAll(".line").remove();
		  
		  svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", `translate(0,${height})`)
			  .call(xAxis);

		  svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
				  
		  svg.append("path")
			  .datum(data)
			  .attr("class", "line")
			  .style("stroke-dasharray", ("4, 4"))
			  .attr("d", baseline);

		  svg.append("path")
			  .datum(data)
			  .attr("class", "line")
			  .attr("d", line);
	}
};