import React, { useEffect, useState } from 'react';
import WeatherAPIService from '../../../Services/WeatherAPIService';

// Define the Weather component props
interface WeatherProps {
  city: string;
}

// Define the Weather component state
interface WeatherState {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

// Define the WeatherData interface here as well, or import it if shared
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


const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [state, setState] = useState<WeatherState>({
    weatherData: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const service = new WeatherAPIService();

    const fetchWeather = async () => {
      try {
        const data = await service.fetchWeather(city);
        setState({ weatherData: data, loading: false, error: null });
      } catch (error) {
        setState({ weatherData: null, loading: false, error: 'Error fetching weather data' });
      }
    };

    fetchWeather();
  }, [city]);

  const { weatherData, loading, error } = state;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weatherData) return null;

  return (
    <div>
      <h2>Weather in {weatherData.location.name}</h2>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Feels Like: {weatherData.current.feelslike_c}°C</p>
      <p>Humidity: {weatherData.current.humidity}%</p>
      <p>Condition: {weatherData.current.condition.text}</p>
      <img
        src={`https:${weatherData.current.condition.icon}`}
        alt={weatherData.current.condition.text}
      />
    </div>
  );
};

export default Weather;
