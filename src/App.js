import React, { Component } from 'react';
import SanFran from './san-fran';
import BarChart from './bar-chart';
// import WorldMap from './world-map';
import Particles from './particles';
import ChordDiagram from './chord-diagram';
import { Route, NavLink, Switch } from "react-router-dom";
import glamorous from 'glamorous';

const Header = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  height: 60,
  width: '100vw',
  background: '#222',
  justifyContent: 'space-around',
  position: 'fixed',

  ' a': {
    color: '#fff',
    textDecoration: 'none'
  }
})

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    for (let i = 1; i < 65; i++) {
      const randomD = Math.floor(Math.random() * i * 10 % 30);
      this.setState(prevState => {
        return prevState.data.push(randomD)
      });
    }
  }

  render() {
    const {data} = this.state;
    return (
      <div className="App">
        <Header>
          <NavLink exact to='/' activeClassName='active'>Particles</NavLink>
          <NavLink to='/san-fran' activeClassName='active'>San Fran</NavLink>
          <NavLink to='/bar-chart' activeClassName='active'>Bar Chart</NavLink>
          <NavLink to='/chord-diagram' activeClassName='active'>Chord Diagram</NavLink>
          {/* <NavLink to='/world-map' activeClassName='active'>World Map</NavLink> */}
        </Header>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Switch>
            <Route exact path='/' component={Particles} />
            <Route path='/san-fran' component={SanFran} />
            <PropsRoute path='/bar-chart' component={BarChart} data={data} />
            <Route path='/chord-diagram' component={ChordDiagram} />
            {/* <Route path='/world-map' component={WorldMap} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
