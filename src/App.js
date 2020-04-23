import React, { Component } from 'react'
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import WeatherComponent from './app_component/WeatherComponent'
import Axios from 'axios'
import FormComponent from './app_component/formComponent'
import Forcast from './app_component/Forcast'


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;



class App extends Component {

  //State
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
      error: false,
      forcast: '',
      isTrue: false
    }


    //Weather icons accroding weather
    
    this.weatherIcon = {

      thunderStorm: "wi-thunderstorm",
      drizzle: "wi-sleet",
      rain: "wi-storm-showers",
      atmosphere: "wi-fog",
      clear: "wi-day-sunny",
      clouds: "wi-day-fog"
    };
  }

  //Convert into Calcelius

  calCelius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell
  };

  //Icon according the weather range

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



  //Search method 
  
  getWeather = (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    //Fetch the data from api according to city

    Axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
      .then(Res => {
        this.setState({
          forcast: [
            {
              data: this.calCelius(Res.data.list[8].main.temp),
              date: Res.data.list[8].dt_txt
            }, {
              data: this.calCelius(Res.data.list[16].main.temp),
              date: Res.data.list[16].dt_txt
            },
            {
              data: this.calCelius(Res.data.list[24].main.temp),
              date: Res.data.list[24].dt_txt
            }, {
              data: this.calCelius(Res.data.list[32].main.temp),
              date: Res.data.list[32].dt_txt
            }
          ]
          ,
          isTrue: true
        });


      })
      
      .catch(error => {
        console.log(error);
      })

      // Only show when the city and country takes from input

    if (city && country) {
      Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
        .then(Res => {
          console.log(Res)
          this.setState({
            city: `${Res.data.name} , ${Res.data.sys.country}`,
            main: this.calCelius(Res.data.main.temp),
            temp_max: this.calCelius(Res.data.main.temp_max),
            temp_min: this.calCelius(Res.data.main.temp_min),
            description: Res.data.weather[0].description,
            error: false,

          });
          this.getWeatherFun(this.weatherIcon, Res.data.weather[0].id)
        })

        .catch(error => {
          console.log(error)
        });

    } else {
      this.setState({ error: true });
    }
  };

    //Redner the component

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
        {this.state.isTrue && <Forcast forcast={this.state.forcast} />}
        <h3 className="text-muted my-3"> @2020 - Sonu Sharma</h3>
      </div>
    )
  }
};

export default App
