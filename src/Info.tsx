import React, { Component } from 'react';
import './Info.scss';
declare const google: any;

enum Conditions {
  Bad = 0,
  Moderate = 1,
  Good = 2,
};

interface IInfoProps {
  isFetched: boolean;
  weather: {
    description: string,
    temperature: number,
    pressure: number,
    humidity: number
  };
}
class Info extends Component<IInfoProps> {

  greenStyle = { color: 'green' };
  yellowStyle = { color: 'orange' };
  redStyle = { color: 'red' };

  evaluateConditions(value: number, min: number, max: number, offset: number) : number {
    if (min <= value && value <= max) {
      return Conditions.Good;
    }
    else if (min-offset <= value && value <= max+offset) {
      return Conditions.Moderate;
    }
    else {
      return Conditions.Bad;
    }
  }

  getDescriptionHeader(degree: number) : JSX.Element {
    if (degree === Conditions.Good) {
      return (<h2 style={this.greenStyle}>Idealne warunki</h2>);
    }
    else if (degree === Conditions.Moderate) {
      return (<h2 style={this.yellowStyle}>Niekorzystne warunki</h2>);
    }
    else {
      return (<h2 style={this.redStyle}>Tragiczne warunki</h2>);
    }
  }

  getWeatherSpan(value: string, degree: number) : JSX.Element {
    if (degree === Conditions.Good) {
      return (<span style={this.greenStyle}>{ value }</span>);
    }
    else if (degree === Conditions.Moderate) {
      return (<span style={this.yellowStyle}>{ value }</span>);
    }
    else {
      return (<span style={this.redStyle}>{ value }</span>);
    }
  }

  render() {
    var degTemperature = this.evaluateConditions(this.props.weather.temperature, 13, 23, 2)
    var degPressure = this.evaluateConditions(this.props.weather.pressure, 1000, 1016, 10)
    var degHumidity = this.evaluateConditions(this.props.weather.humidity, 40, 60, 5)
    
    if (!this.props.isFetched) {
      return (
        <div id="info">
          <p>Oczekuję na określenie pozycji</p>
        </div>
      );
    }
    return (
      <div id="info">
        { this.getDescriptionHeader(Math.min(degTemperature, degPressure, degHumidity)) }
        <div>
        <p style={{ textTransform: 'capitalize' }}>{ this.props.weather.description }</p>
          <p>Temperatura: { this.getWeatherSpan(this.props.weather.temperature.toString(), degTemperature) }°C</p>
          <p>Ciśnienie: { this.getWeatherSpan(this.props.weather.pressure.toString(), degPressure) } hPa</p>
          <p>Wilgotność: { this.getWeatherSpan(this.props.weather.humidity.toString(), degHumidity) }%</p>
        </div>
      </div>
    );
  }
}

export default Info;