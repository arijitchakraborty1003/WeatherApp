import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeatherData } from '../types';
import LottieView from 'lottie-react-native';
import { getWeatherAnimation } from '../utils/animationHelper';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  data: WeatherData;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export default function WeatherInfo({ data, isFavorite, onFavoriteToggle }: Props) {
  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind,
    clouds,
    sys: { sunrise, sunset },
    } = data;

    const formatTime = (timestamp: number) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString();
    };
    const animationSource = getWeatherAnimation(data.weather[0].main);
  
    return (
      <View style={styles.container}>
        <LottieView
          source={animationSource}
          autoPlay
          loop
          style={styles.animation}
        /> 
        <View style={styles.header}>
        <Text style={styles.city}>{name}</Text>
        <TouchableOpacity onPress={onFavoriteToggle}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? 'red' : 'gray'}
          />
  </TouchableOpacity>
</View>
      <Text style={styles.city}>{name}</Text>
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.desc}>{weather[0].description}</Text>

      <View style={styles.extraInfo}>
        <Text>Feels like: {feels_like}°C</Text>
        <Text>Humidity: {humidity}%</Text>
        <Text>Wind Speed: {wind.speed} m/s</Text>
        <Text>Cloudiness: {clouds.all}%</Text>
        <Text>Pressure: {pressure} hPa</Text>
        <Text>Sunrise: {formatTime(sunrise)}</Text>
        <Text>Sunset: {formatTime(sunset)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#e0f7fa', borderRadius: 10, marginTop: 2 },
  city: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  animation: { width: 150, height: 100 },
  temp: { fontSize: 44, fontWeight: 'bold', textAlign: 'center' },
  desc: { fontSize: 14, fontStyle: 'italic', textAlign: 'center' },
  extraInfo: {
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});