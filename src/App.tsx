import React, { useState } from 'react';
import logo from './logo.svg';
import Map from './Map';
import Info from './Info';
import './App.scss';

const App: React.FC = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [weather, setWeather] = useState({
    description: '',
    temperature: 0,
    pressure: 0,
    humidity: 0,
  });
  function fetchWeather(weatherData: typeof weather) : any {
    setIsFetched(true);
    setWeather({
      description: weatherData.description,
      temperature: weatherData.temperature,
      pressure: weatherData.pressure,
      humidity: weatherData.humidity,
    });
  };

  return (
    <div className="App">
      <main>
        <img src={logo} className="App-logo" alt="logo" />
        <Info isFetched = {isFetched} weather = {weather}/>
      </main>
      <div className="Map">
        <Map fetchWeather = {fetchWeather}/>
      </div>
    </div>
  );
}

export default App;
