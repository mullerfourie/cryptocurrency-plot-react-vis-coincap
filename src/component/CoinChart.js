import React from 'react';
import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  GradientDefs,
  linearGradient,
  AreaSeries,
  LineSeries } from 'react-vis';
import { getCoinLive } from '../api/CoinCapAPI';

import styles from '../styles/general';

class CoinChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trade: {},
      coinPrice: [{x: 0, y: 0}],
    };
    this.tickerAmount = 1;
  }

  render() {
    return (
      <div>
        <div style={{ border: '3px solid #cc2020', ...styles.flexColumnCenter }}>
          <div style={{ backgroundColor: '#cc2020', padding: '7px', paddingLeft: '40px', borderOpacity: 0.5, ...styles.flexRowSpaceBetween }}>
            <h1 style={{ color: '#222' }} className="App-title">{this.props.name}</h1>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <XYPlot xType='time' height={window.innerHeight * 0.4} width={window.innerWidth * 0.9}>
            <GradientDefs>
              <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#cc2020" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#222" stopOpacity={0.3} />
              </linearGradient>
            </GradientDefs>
                <XAxis title='Time' style={{ line: {stroke: '#222'}, ticks: {stroke: '#cc2020'} }} />
                <YAxis  title='Price' style={{ line: {stroke: '#222'}, ticks: {stroke: '#cc2020'}, text: { color: 'red', stroke: '#cc2020', fill: '#6b6b76', fontWeight: 600 } }} />
                <AreaSeries animation color={'url(#blueGradient)'} getNull={(d) => d.y !== null} data={this.props.data} />
                <LineSeries animation  stroke='#cc2020' strokeWidth='2px' getNull={(d) => d.y !== null} data={this.props.data} />
            </XYPlot>
          </div>
        </div>
      </div>
    );
  }
};

export default CoinChart;