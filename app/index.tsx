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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const backgroundColor = weather ? getBackgroundColor(weather.weather[0].main) : '#ffffff';
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const FAVORITES_KEY = 'FAVORITE_CITIES';

const loadFavorites = async () => {
  try {
    const saved = await AsyncStorage.getItem(FAVORITES_KEY);
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  } catch (error) {
    console.error('Failed to load favorites', error);
  }
};

const saveFavorites = async (newFavorites: string[]) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  } catch (error) {
    console.error('Failed to save favorites', error);
  }
};
  
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
    loadFavorites();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter city"
          value={city}
          onChangeText={handleCityChange}
          style={styles.inputCompact}
        />
        <TouchableOpacity onPress={handleGetWeather} style={styles.getButton}>
          <Text style={styles.getButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      )}
      {favorites.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Favorite Cities:</Text>
          {favorites.map((fav) => (
            <TouchableOpacity
              key={fav}
              onPress={() => {
                setCity(fav);
                handleGetWeather(); 
              }}
            >
              <Text style={{ color: 'blue', paddingVertical: 4 }}>{fav}</Text>
            </TouchableOpacity>
          ))}
        </View>
)}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {weather && (
      <WeatherInfo
        data={weather}
        isFavorite={favorites.includes(city)}
        onFavoriteToggle={() => {
          if (!city) return;

          const isFav = favorites.includes(city);
          const updated = isFav
            ? favorites.filter(c => c !== city)
            : [...favorites, city];

          setFavorites(updated);
          saveFavorites(updated);
        }}
        />
      )}
      {forecast && <ForecastList data={forecast.list} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  inputCompact: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  
  getButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  
  getButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60, // adjust depending on your input position
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 10,
    elevation: 10, // for Android
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  suggestion: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});