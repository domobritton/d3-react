import React, { Component } from 'react';
import './App.css';
import worlddata from './world';
import { geoMercator, geoPath } from 'd3-geo';
import * as d3 from 'd3';
import glamorous from 'glamorous';

const Countries = glamorous.div({
  width: '100vw',
  height: '100%',
  minWidth: 960, 
  minHeight: '100vh',
  background: '#222'
});

class WorldMap extends Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  render() {
    const {width, height} = this.state;
    const projection = geoMercator();
    projection.scale(300)
    const pathGenerator = geoPath().projection(projection);
    const colors = ['#1CB5E0', '#f4791f', '#000046'];
    const countries = worlddata.features
        .map((d,i) => {
        return <path
        key={'path' + i}
        d={pathGenerator(d)}
        style={{fill: d3.rgb(colors[i % 3])}}
        />
      });
  return (
    <Countries>
      <svg width={width} height={height} ref={ref => this.node = ref}>
        {countries}
      </svg>
    </Countries>
   );
  }
}
export default WorldMap;