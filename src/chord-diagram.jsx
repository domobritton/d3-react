import React, { Component } from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  background: '#659999',
  background: '-webkit-linear-gradient(to top, #1CB5E0, #000046)',
  background: 'linear-gradient(to top, #1CB5E0, #000046)',
  minWidth: 960,
  minHeight: '100vh',
  width: '100vw',
  height: '100%'
})

class ChordDiagram extends Component {

  state = {
    data: []
  }

  async componentDidMount() {
    const response = await d3.json('https://gist.githubusercontent.com/mbostock/1044242/raw/3ebc0fde3887e288b4a9979dad446eb434c54d08/flare.json');
    this.setState({data: response});
    this.chart();
  }

  componentDidUpdate() {
    this.chart();
  }

  chart = () => {
    const node = this.node;
    const width = 600;
    const height = width;
    const outerRadius = Math.min(width, height) * 0.5;
    const innerRadius = outerRadius - 124;
    const chord = d3.chord()
                    .padAngle(.04)
                    .sortSubgroups(d3.descending)
                    .sortChords(d3.descending);
    const arc = d3.arc()
                  .innerRadius(innerRadius)
                  .outerRadius(innerRadius + 20);
    const ribbon = d3.ribbon()
                     .radius(innerRadius);
    const color = d3.scaleOrdinal(d3.schemeDark2);
    const svg = select(node)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('font-size', 6)
        .attr('font-family', 'sans-serif')
        .style('width', '100%')
        .style('height', 'auto');
    const {matrix, nameByIndex} = this.data();

    const chords = chord(matrix);
  
    const group = svg.append('g')
        .selectAll('g')
        .data(chords.groups)
        .join('g');

    group.append('path')
        .attr('fill', d => color(d.index))
        .attr('stroke', d => color(d.index))
        .attr('d', arc);
  
    group.append('text')
        .each(d => {d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr('dy', '.35em')
        .attr('transform', d => ` 
          rotate(${(d.angle * 180 / Math.PI - 90)})
          translate(${innerRadius + 26})
          ${d.angle > Math.PI ? 'rotate(180)' : ''}
          `)
        .attr('text-anchor', d => d.angle > Math.PI ? 'end' : null)
        .text(d => nameByIndex.get(d.index))
        .style('fill', '#fff');

    svg.append('g')
        .attr('fill-opacity', 0.67)
        .selectAll('path')
        .data(chords)
        .join('path')
        .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
        .attr('fill', d => color(d.source.index))
        .attr('d', ribbon);
  }

  data = () => {
    const {data} = this.state;
    const imports = data;
    const indexByName = new Map();
    const nameByIndex = new Map();
    const matrix = [];
    let n = 0;
  
    // Returns the Flare package name for the given class name.
    function name(name) {
      return name.substring(0, name.lastIndexOf('.')).substring(6);
    }
  
    // Compute a unique index for each package name.
    imports.forEach(d => {
      if (!indexByName.has(d = name(d.name))) {
        nameByIndex.set(n, d);
        indexByName.set(d, n++);
      }
    });
  
    // Construct a square matrix counting package imports.
    imports.forEach(d => {
      const source = indexByName.get(name(d.name));
      let row = matrix[source];
      if (!row) row = matrix[source] = Array.from({length: n}).fill(0);
      d.imports.forEach(d => row[indexByName.get(name(d))]++);
    });
  
    return {
      matrix,
      indexByName,
      nameByIndex
    };
  }

  render() {
    return (
      <Wrapper>
        <svg ref={ref => this.node = ref}>
        </svg>
      </Wrapper>
    )
  }
}

export default ChordDiagram;