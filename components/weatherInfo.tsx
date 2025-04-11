import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { WeatherData } from '../types';
import LottieView from 'lottie-react-native';
import { getWeatherAnimation } from '../utils/animationHelper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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

  const animationSource = getWeatherAnimation(weather[0].main);

  const getBackgroundImage = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return require('../assets/bg/clear.jpg');
      case 'clouds':
        return require('../assets/bg/cloudy.jpg');
      case 'rain':
        return require('../assets/bg/rainy.jpg');
      case 'snow':
        return require('../assets/bg/snow.jpg');
      case 'thunderstorm':
        return require('../assets/bg/thunderstorm.jpg');
      default:
        return require('../assets/bg/default.jpg');
    }
  };

  const backgroundImage = getBackgroundImage(weather[0].main);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.card}
      imageStyle={styles.cardBackground}
    >
      <View style={styles.header}>
        <Text style={styles.city}>{name}</Text>
        <TouchableOpacity onPress={onFavoriteToggle}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? 'red' : '#222'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.weatherTextBlock}>
          <Text style={styles.temp}>{temp}°C</Text>
          <Text style={styles.desc}>{weather[0].description}</Text>
        </View>
        <LottieView
          source={animationSource}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <View style={styles.extraInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Feels: {feels_like}°C</Text>
          <Text style={styles.infoText}>Humidity: {humidity}%</Text>
          <Text style={styles.infoText}>Wind: {wind.speed} m/s</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Clouds: {clouds.all}%</Text>
          <Text style={styles.infoText}>Pressure: {pressure} hPa</Text>
          <Text style={styles.infoText}>Sunrise: {formatTime(sunrise)}</Text>
          <Text style={styles.infoText}>Sunset: {formatTime(sunset)}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: 300,
    borderRadius: 16,
    padding: 16,
    alignSelf: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardBackground: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  city: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    maxWidth: width * 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherTextBlock: {
    flex: 1,
  },
  temp: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
  },
  desc: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#eee',
  },
  animation: {
    width: 100,
    height: 100,
  },
  extraInfo: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#fff',
    width: '48%',
    marginVertical: 2,
  },
});
