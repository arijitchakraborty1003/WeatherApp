import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

interface ForecastItem {
  dt_txt: string;
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
      <Text style={styles.header}>5-Day Forecast</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.dt_txt}
        renderItem={({ item }) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          const time = new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <View style={styles.card}>
              <Text style={styles.date}>{item.dt_txt.split(' ')[0]}</Text>
              <Text style={styles.time}>{time}</Text>
              <Image source={{ uri: iconUrl }} style={styles.icon} />
              <Text style={styles.temp}>{item.main.temp}°C</Text>
              <Text style={styles.desc}>{item.weather[0].description}</Text>
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    width: 120,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  time: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
});

export default ForecastList;
