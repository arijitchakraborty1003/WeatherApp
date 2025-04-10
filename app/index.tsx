import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { getWeatherByCity } from '../services/weatherServices';
import WeatherInfo from '../components/weatherInfo';
import { getBackgroundColor } from '../utils/backgroundHelper';
import { WeatherData } from '../types';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const backgroundColor = weather ? getBackgroundColor(weather.weather[0].main) : '#ffffff';

  const handleGetWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError('Could not fetch weather. Try another city.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <Button title="Get Weather" onPress={handleGetWeather} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {weather && <WeatherInfo data={weather} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
});