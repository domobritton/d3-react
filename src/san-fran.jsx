import React, { Component } from 'react';
import * as d3 from 'd3';
import { geoPath } from 'd3-geo';
import glamorous from 'glamorous';

const Section = glamorous.section({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  minHeight: '100vh',
  background: '#222'
});

class SanFran extends Component {
  state = {
    data: [],
    foodCarts: []
  };

  async componentDidMount() {
    try {
      const response = await d3.json(
        'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/san-francisco.geojson'
      );
      if (response.errorMessage) {
        console.log('error');
      } else {
        this.setState({ data: response });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const response = await d3.json(
        'https://data.sfgov.org/resource/rqzj-sfat.json'
      );
      if (response.errorMessage) {
        console.log(response.errorMessage);
      } else {
        this.setState({ foodCarts: response });
      }
    } catch (e) {
      console.log(e);
    }
  }

  projection() {
    return d3
      .geoMercator()
      .scale(100)
      .translate([760 / 1.4, 760 / 1.4]);
  }

  renderFoodCarts = () => {
    const { foodCarts } = this.state;
    if (foodCarts.length !== 0) {
      return (
        <>
          {foodCarts.map(({ location: { coordinates } }, i) => {
            let filteredCoords = coordinates.filter(cord => cord !== 0);
            if (filteredCoords.length !== 0) {
              const amp = [
                Math.floor(((filteredCoords[0] * 1000) % 1000).toFixed(2)),
                Math.floor(((filteredCoords[1] * 1000) % 1000).toFixed(2))
              ];
              return (
                <circle
                  key={`marker-${i}`}
                  cx={this.projection()(amp)[0]}
                  cy={this.projection()(amp)[1]}
                  r={5}
                  fill="#999"
                  stroke="#eee"
                  className="marker"
                />
              );
            }
            return null;
          })}
        </>
      );
    }
    return null;
  };

  renderSanFran = () => {
    const { data } = this.state;
    if (data.length !== 0) {
      const albersProjection = d3.geoMercator().fitSize([760, 760], data);
      const pathGenerator = geoPath().projection(albersProjection);
      return (
        <g className="san-fran">
          {data.features.map((d, i) => (
            <path
              key={'san-fran-' + i}
              d={pathGenerator(d)}
              style={{ fill: '#900', stroke: '#999' }}
            />
          ))}
        </g>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <Section>
        <svg
          width={760}
          height={760}
          viewBox="0 0 760 760"
          ref={ref => (this.node = ref)}
        >
          {this.renderSanFran()}
          {this.renderFoodCarts()}
        </svg>
      </Section>
    );
  }
}

export default SanFran;
