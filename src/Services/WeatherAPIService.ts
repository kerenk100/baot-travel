import axios from 'axios';

// Define the interface for the weather data
interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

// Define the service class
class WeatherAPIService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY;;
  }

  // Method to fetch weather data
  async fetchWeather(city: string): Promise<WeatherData> {
    const response = await axios.get<WeatherData>(
      `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}&aqi=no`
    );
    return response.data;
  }
}

export default WeatherAPIService;
