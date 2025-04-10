import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherData } from '../types';

type Props = {
  data: WeatherData;
};

const WeatherInfo: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{data.name}</Text>
      <Text style={styles.temp}>{data.main.temp}°C</Text>
      <Text style={styles.desc}>{data.weather[0].description}</Text>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  container: { marginTop: 20, alignItems: 'center' },
  city: { fontSize: 24 },
  temp: { fontSize: 40, fontWeight: 'bold' },
  desc: { fontSize: 18, fontStyle: 'italic' },
});