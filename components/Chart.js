import React, {Component} from 'react';
import '!style!css!./Chart.css';

const margin = {top: 20, right: 20, bottom: 20, left: 80},
	fullWidth = 800,
	fullHeight = 300,
	width = fullWidth - margin.left - margin.right,
	height = fullHeight - margin.top - margin.bottom;
	
const ANIM_SPEED=250;

const x = d3.scale.linear()
			.range([0, width]);

const y = d3.scale.linear()
			.range([height, 0]);
			
const line = d3.svg.line()
			.x((d,i)=>x(i+((d.partial/12)||1)-1))
			.y(d=>y(d.balance));

const baseline = d3.svg.line()
			.x((d,i)=>x(i))
			.y(d=>y(d.baseline));		

const xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

const yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");


export default class Chart extends Component {

	render() {
		return (<svg ref="chart"></svg>)
	}
	
	shouldComponentUpdate({data}){
		x.domain([0,data.length-1])
		y.domain([0,data[0].balance]);
		xAxis.ticks(Math.min(data.length,30))
		
		var svg=d3.select(this.refs.chart)
			.select("g")
			.transition();

		svg.select(".overpayline")
			.duration(ANIM_SPEED)
			.attr("d", line(data));
		
		svg.select(".baseline")
			.duration(ANIM_SPEED)
			.attr("d", baseline(data));
		
		svg.select(".x.axis")
			.duration(ANIM_SPEED)
			.call(xAxis);
		
		svg.select(".y.axis")
			.duration(ANIM_SPEED)
			.call(yAxis);
		
		return false;
	}

	componentDidMount() {
		d3.select(this.refs.chart)
			.attr("width", "100%")
			.attr("height", "100%")
			.attr('viewBox',`0 0 ${fullWidth} ${fullHeight}`)
			.attr('preserveAspectRatio','xMidYMid')
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		var {data} = this.props;

		var svg = d3.select(this.refs.chart).select("g");
			
		x.domain([0,data.length-1])
		y.domain([0,data[0].balance]);
		xAxis.ticks(Math.min(data.length,30))

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0,${height})`)
			.call(xAxis);
		
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
				
		svg.append("path")
			.datum(data)
			.attr("class", "line baseline")
			.attr("d", baseline);
		
		svg.append("path")
			.datum(data)
			.attr("class", "line overpayline")
			.attr("d", line);
	}	
};