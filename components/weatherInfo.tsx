import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { WeatherData } from '../types';
import { getWeatherAnimation } from '../utils/animationHelper';

type Props = {
  data: WeatherData;
};

const WeatherInfo: React.FC<Props> = ({ data }) => {
  const animationSource = getWeatherAnimation(data.weather[0].main);

  return (
    <View style={styles.container}>
      <LottieView
        source={animationSource}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
      <Text style={styles.desc}>{data.weather[0].description}</Text>
      <Text style={styles.city}>{data.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  animation: { width: 200, height: 200 },
  temp: { fontSize: 48, fontWeight: 'bold' },
  desc: { fontSize: 20, textTransform: 'capitalize', marginVertical: 5 },
  city: { fontSize: 18, color: '#555' },
});

export default WeatherInfo;