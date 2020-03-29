import React, { Component } from 'react'
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import WeatherComponent from './app_component/WeatherComponent'
import Axios from 'axios'
import FormComponent from './app_component/formComponent'


//const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

//api.openweathermap.org/data/2.5/weather?q=London,uk

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    }

    this.weatherIcon = {

      thunderStorm: "wi-thunderstorm",
      drizzle: "wi-sleet",
      rain: "wi-storm-showers",
      atmosphere: "wi-fog",
      clear: "wi-day-sunny",
      clouds: "wi-day-fog"
    };
  }

  calCelius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell
  }


  getWeatherFun = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.thunderStorm })
        break;

      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.drizzle })
        break;

      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.rain })
        break;

      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.snow })
        break;

      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.atmosphere })
        break;

      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.clear })
        break;

      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.clouds })
        break;
      default:
        this.setState({ icon: this.weatherIcon.clouds })
    }
  };


  getWeather = (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      Axios.get(`https://samples.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=b6907d289e10d714a6e88b30761fae22`)
        .then(Res => {
          console.log(Res)
          this.setState({
            city: `${Res.data.name} , ${Res.data.sys.country}`,
            main: this.calCelius(Res.data.main.temp),
            temp_max: this.calCelius(Res.data.main.temp_max),
            temp_min: this.calCelius(Res.data.main.temp_min),
            description: Res.data.weather[0].description,
            error: false

          });
          this.getWeatherFun(this.weatherIcon, Res.data.weather[0].id)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      this.setState({ error: true })
    }



  };

  render() {
    return (
      <div className="App">
        <FormComponent loadWeather={this.getWeather} error={this.state.error} />
        <WeatherComponent city={this.state.city}
          country={this.state.country}
          celsius={this.state.main}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          icon={this.state.icon} />
        <h3 className="text-muted"> @2020 - Sonu Sharma</h3>
      </div>
    )
  }
}

export default App
