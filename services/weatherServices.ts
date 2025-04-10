import axios from 'axios';
import { WeatherData, ForecastResponse } from '../types';

const API_KEY = '865f2babe9f6d938145c021ae8b86ae1';

//import { OPENWEATHER_API_KEY } from '@env';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherByCity = async (city: string) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  // Log the full request URL
  console.log('Fetching weather data from:', url);

  const response = await fetch(url);

  // Log response status
  console.log('Response status:', response.status);

  if (!response.ok) {
    // Log error response text for debugging
    const errorText = await response.text();
    console.error('Error fetching weather:', errorText);
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  // Log the actual response data
  console.log('Weather data received:', data);

  return data;
};

export const getWeatherByCoords = async (lat: number, lon: number) => {
  const response = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getForecastByCity = async (city: string): Promise<ForecastResponse> => {
  const response = await fetch(
    `${FORECAST_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch forecast');
  }
  return response.json();
};