import React, { Component, createRef } from 'react';
import './Map.scss';
declare const google: any;

interface IMapProps {
  fetchWeather({description, temperature, pressure, humidity} : {
    description: string,
    temperature: number,
    pressure: number,
    humidity: number
  }) : any
}

class Map extends Component<IMapProps> {
  mapRef = createRef<HTMLDivElement>();

  getReqURL = (lat: number, lng: number) => `http://api.openweathermap.org/data/2.5/\
weather?lat=${lat}&lon=${lng}\
&lang=pl&units=metric&appid=${process.env.WEATHER_API_KEY}`

  componentDidMount() {
    const googleScript = document.createElement("script");
    googleScript.src = "/static/libs/your_script.js";
    googleScript.async = true;
    googleScript.defer = true;
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&callback=initMap`;
    document.body.appendChild(googleScript);
    googleScript.addEventListener('load', () => {
      this.initMap();
    })
  }

  createMap = (lat : number, lng : number) => {
    var map: google.maps.Map;
    map = new google.maps.Map(this.mapRef.current, {
      zoom: 16,
      center: { lat, lng },
      disableDefaultUI: true
    });
    new google.maps.Marker({
      position: { lat, lng },
      map: map
    });
  }

  initMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.createMap(position.coords.latitude, position.coords.longitude);
        fetch(this.getReqURL(position.coords.latitude, position.coords.longitude), { method: 'GET', mode: 'cors' })
          .then(response => {
            if(response.ok) {
              return response.json()
                .then(data => {
                  this.props.fetchWeather({ 
                    description: data.weather[0].description,
                    temperature: data.main.temp,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity
                  })
                })
            } else {
              alert('Wystąpił błąd podczas pobierania danych pogodowych')
              return Promise.resolve()
            }
          })
          .catch(err => { alert(err.message) })
          
      },
      (errorMessage) => {
        alert('Nie można uzyskać dostępu do Twojej lokalizacji. Sprawdź, czy strona ma taką możliwość.');
        this.createMap(52.112795, 19.211946);
      }
    );
  }

  render() {
    return (
      <div
        id="map"
        ref={this.mapRef}
      />
    )
  }
}

export default Map;
