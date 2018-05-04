import axios from 'axios';
import openSocket from 'socket.io-client';
const socket = openSocket('https://coincap.io');

function fetchLiveTradesTimer (callback) {
  socket.on('trades', timestamp => callback(null, timestamp));
  socket.emit('subscribeToTimer', 10000);
};

function getCoinLive (_coinType) {
  return axios.get(`http://coincap.io/page/${_coinType}`)
}

function getCoinDayHistory (_coinType) {
  return axios.get(`http://coincap.io/history/1day/${_coinType}`)
}

export { getCoinDayHistory, getCoinLive, fetchLiveTradesTimer };