import axios from 'axios';
import { WeatherData } from '../types';

const API_KEY = 'YOUR_API_KEY_HERE';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return response.data;
};