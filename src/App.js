import React from 'react';
import './App.css';
import BarChart from './bar-chart';
import WorldMap from './world-map';

function App() {
  return (
    <div className="App">
      <h3>Bar Chart and Map</h3>
      <div style={{display: 'flex'}}>
        <div style={{flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <BarChart data={[5, 10, 1, 3, 6, 11, 13, 2, 1, 10, 3, 12, 2, 1]} size={[500, 500]} />
        </div>
        <WorldMap />
      </div>
    </div>
  );
}

export default App;
