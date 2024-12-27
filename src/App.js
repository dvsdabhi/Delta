import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

function App() {
  const [Niftydata, NiftysetData] = useState([]); // Initialize data as an empty array
  const [Sensexdata, SensexsetData] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to backend WebSocket server');
    });
    // console.log("data-=-=-=-=-=",socket);

    socket.on('tick', (data) => {
      // console.log("data-=-=-=-=-=",data.token);
      let obj = {
        NiftToken:"",
        NiftLTP:"",
        SensexToken:"",
        SensexLTP:""
      }
      setData(obj);
      // if ( exchange_type === '1') {
      //   NiftysetData(data);
      // } else if (exchange_type === '3') {
      //   SensexsetData(data);
      // } else if (exchange_type === '2') {
      //   SensexsetData(data);
      // } else if (exchange_type === '4') {
      //   SensexsetData(data);
      // }
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="App">
      <h1>Token : {(Niftydata.last_traded_price/100).toFixed(2)} ATM :{Math.round((Niftydata.last_traded_price/100)/50) * 50} LTP : {}</h1>
      <h1>Token : {(Sensexdata.last_traded_price/100).toFixed(2)} ATM :{Math.round((Sensexdata.last_traded_price/100)/100) * 100} </h1>
    </div>
  );
}

export default App;
