import React, { Component } from 'react';
import glamorous from 'glamorous';
import { select } from 'd3-selection';
import * as d3 from 'd3';


const Wrapper = glamorous.div({
  background: '#659999',
  background: '-webkit-linear-gradient(to top, #1CB5E0, #000046)',
  background: 'linear-gradient(to top, #1CB5E0, #000046)',
  minWidth: 960,
  minHeight: '100vh',
  width: '100vw',
  height: '100%',
  cursor: 'pointer',

  '& rect': {
    fill: 'none',
    pointerEvents: 'all'
  },

  '& circle': {
    fill: 'none',
    strokeWidth: 3.5
  }
});

class Particles extends Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  updateDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.createParticles();
  }

  componentDidUpdate() {
    this.createParticles();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  particle = (i) => {
    const node = this.node;
  
    let m = d3.mouse(select(node).select('rect').node());

    select(node)
      .insert('circle', 'rect')
      .attr('cx', m[0])
      .attr('cy', m[1])
      .attr('r', 1e-6)
      .style('stroke', d3.hsl((i % 360), 1, .5))
      .style('stroke-opacity', 1)
      .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr('r', 150)
      .style('stroke-opacity', 1e-6)
      .remove();

    d3.event.preventDefault();
  }

  createParticles = () => {
    let width = Math.max(960, this.state.width);
    let height = Math.max(500, this.state.height);

    const node = this.node;
    let i = 0;

    select(node)
      .attr('width', width)
      .attr('height', height)
    
    select(node)
      .insert('rect')
      .attr('width', width)
      .attr('height', height)
      .on('ontouchstart' in document ? 'touchmove' : 'mousemove', () => {i += 1; return this.particle(i)})
  }

  render() {
    return (
      <Wrapper>
        <svg ref={node => this.node = node}>
        </svg>
      </Wrapper>
    );
  }
}

export default Particles;