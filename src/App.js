import React, { Component } from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import data from "./test-data.json"
import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: data,
      startDate: null,
      endDate: null,
      location: ''
    };
  }

  updateDashboard() {
    let filteredWeatherData = data;
    if (this.state.startDate) {
      filteredWeatherData = filteredWeatherData.filter(item => new Date(item.date) >= this.state.startDate);
      
    }
    if (this.state.endDate) {
      filteredWeatherData = filteredWeatherData.filter(item => new Date(item.date) <= this.state.endDate);
    }
    if (this.state.location) {
      filteredWeatherData = filteredWeatherData.filter(item => item.town.toLowerCase().includes(this.state.location.toLowerCase()));
    }
    this.setState({ ...this.state, weatherData: filteredWeatherData });
  }

  render() {
    return (
      <div className="App">
        <EditableSection
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          location={this.state.location}
          onStartDateChange={(date) => {
            this.setState({ startDate: date }, () => {
              this.updateDashboard();
            });
          }}
          onEndDateChange={(date) => {
            this.setState({ endDate: date }, () => {
              this.updateDashboard();
            });
          }}
          onLocationChange={(event) => {
            this.setState({ location: event.target.value }, () => {
              this.updateDashboard();
            });
          }}
        />
        <div className="editable-section overflow-container">
          {this.state.weatherData.map((item, index) => (
            <WeatherCard
              date={item.date}
              weather={item.weather}
              location={item.location}
              key={index}
            />
          ))}
        </div>
        <div>
          {this.state.weatherData.length} results
        </div>
      </div>
    );
  }
}

export default App;
