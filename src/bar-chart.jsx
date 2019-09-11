import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';

class BarChart extends Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  updateDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  createBarChart = () => {
    const {data} = this.props;
    const {height} = this.state;
    console.log(data)
    const colors = ['#1CB5E0', '#f4791f', '#000046'];
    const node = this.node;
    const dataMax = max(data);
    const yScale = scaleLinear()
        .domain([0, dataMax])
        .range([0, height]);
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
      .attr('x', (d,i) => i * 35)
      .attr('y', d => height - yScale(0))
      .attr('height', d => height - yScale(0))
      .attr('width', 35)
      .attr("fill", (d, i) => colors[i % 3]);
    
    select(node)
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr("y", d => height - yScale(d))
      .attr("height", d => yScale(d))
      .delay((_,i) => i*100)
  }

  render() {
    const {width, height} = this.state;
    return (
      <div style={{paddingTop: 20, margin: 0}}>
        <svg ref={node => this.node = node}
          width={width} height={height}>
        </svg>
      </div>
    );
  }
}

export default BarChart;