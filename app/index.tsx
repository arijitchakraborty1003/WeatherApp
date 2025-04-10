import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert 
} from 'react-native';
import * as Location from 'expo-location';
import { getWeatherByCity, getWeatherByCoords, getForecastByCity } from '../services/weatherServices';
import WeatherInfo from '../components/weatherInfo';
import { getBackgroundColor } from '../utils/backgroundHelper';
import { WeatherData } from '../types';
import { FlatList, TouchableOpacity } from 'react-native';
import { fetchCitySuggestions } from '../services/cityService';
import  ForecastList  from '../components/ForecastList';
import { ForecastResponse } from '../types';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const backgroundColor = weather ? getBackgroundColor(weather.weather[0].main) : '#ffffff';
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  
  const fetchWeatherByLocation = async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const data = await getWeatherByCoords(latitude, longitude);
      setWeather(data);
      setCity(data.name); // autofill city input
      const forecastData = await getForecastByCity(data.name);
      //console.log('Forecast Data:', forecastData); // 🧪 Check if this shows the data
      setForecast(forecastData);
    } catch (err) {
      setError('Could not fetch weather by location.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      const forecastData = await getForecastByCity(city);
      //console.log('Forecast Data:', forecastData); // 🧪 Check if this shows the data
      setForecast(forecastData);
    } catch (err) {
      setError('Could not fetch weather. Try another city.');
    } finally {
      setLoading(false);
    }
  };
  const handleCityChange = async (text: string) => {
    setCity(text);
    if (text.length > 1) {
      const results = await fetchCitySuggestions(text);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleSuggestionSelect = (selected: string) => {
    setCity(selected);
    setSuggestions([]);
  };
  
  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        placeholder="Enter city name"
        value={city}
        onChangeText={handleCityChange}
        style={styles.input}
      />

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Button title="Get Weather" onPress={handleGetWeather} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {weather && <WeatherInfo data={weather} />}
      {forecast && <ForecastList data={forecast.list} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
  suggestion: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});