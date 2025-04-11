// components/ForecastList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface ForecastListProps {
  data: ForecastItem[];
}

const ForecastList: React.FC<ForecastListProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{new Date(item.dt * 1000).toLocaleString()}</Text>
            <Text>{item.main.temp}°C</Text>
            <Text>{item.weather[0].description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ForecastList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    elevation: 3,
  },
});
