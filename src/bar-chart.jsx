import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';

class BarChart extends Component {

  componentDidMount() {
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart = () => {
    const {data, size} = this.props;
    const colors = ['#bada55', '#fe9922', '#a65def'];
    const node = this.node;
    const dataMax = max(data);
    const yScale = scaleLinear()
        .domain([0, dataMax])
        .range([size[1], 0]);
    select(node)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');
    
    select(node)
      .selectAll('rect')
      .data(data)
      .exit()
      .remove();
    
    select(node)
      .selectAll('rect')
      .data(data)
      .attr('x', (d,i) => i * 25)
      .attr('y', d => yScale(0))
      .attr('height', d => size[1] - yScale(0))
      .attr('width', 25)
      .attr("fill", function(d, i) { return colors[i % 3]});
    
    select(node)
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr("y", function(d) { return  size[1] - yScale(d); })
      .attr("height", function(d) { return  yScale(d); })
      .delay(function(d,i){console.log(d) ; return(i*100)})
  }

  render() {
    return (
      <svg ref={node => this.node = node}
        width={500} height={500}>
      </svg>
    );
  }
}

export default BarChart;