import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeatherData } from '../types';

interface Props {
  data: WeatherData;
}

const WeatherInfo: React.FC<Props> = ({ data }) => {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{data.name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
      <Text style={styles.desc}>{data.weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  city: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  icon: { width: 100, height: 100 },
  temp: { fontSize: 48, fontWeight: 'bold' },
  desc: { fontSize: 20, textTransform: 'capitalize', marginTop: 10 },
});

export default WeatherInfo;