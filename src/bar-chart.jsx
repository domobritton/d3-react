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
        .range([0, size[1]]);
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
      .attr('y', d => size[1] - yScale(0))
      .attr('height', d => size[1] - yScale(0))
      .attr('width', 25)
      .attr("fill", (d, i) => colors[i % 3]);
    
    select(node)
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr("y", d => size[1] - yScale(d))
      .attr("height", d => yScale(d))
      .delay((_,i) => i*100)
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