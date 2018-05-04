import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'underscore';
import logo from './logo.svg';
import './App.css';
import '../node_modules/react-vis/dist/style.css'; // chart styling (react-vis)
import styles from './styles/general';
import CoinChart from './component/CoinChart';

const COIN_CAP_URL = 'http://coincap.io';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trade: {},
      coinPrice: [{x: 0, y: 0}],
    };
  }

  componentDidMount() {
    this.getCoinDayHistory();
  }

  getCoinDayHistory() {
    axios.get(`${COIN_CAP_URL}/history/BTC`).then((response) => {
      const { data: { price = [] } } = response;
      const array = [];
      _.each(price, (tick) => {
        array.push({ x: tick[0], y: moment(tick[1]) });
      });
      this.setState({ coinPrice: array });
    });
  }

  getTradePrice(trade) {
    const { msg: { price = 0 } = {} } = trade;
    return price;
  }

  render() {
    return (
      <div className="App" style={{ height: window.innerHeight }}>
          <div style={{ padding: '20px'}}>
            <CoinChart name='BTC PLOT' data={this.state.coinPrice} />
          </div>
      </div>
    );
  }
}

export default App;
