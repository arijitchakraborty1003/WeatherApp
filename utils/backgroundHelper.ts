export const getBackgroundColor = (weatherMain: string): string => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return '#fef3c7'; // sunny
    case 'clouds':
      return '#d1d5db'; // cloudy
    case 'rain':
    case 'drizzle':
      return '#a5b4fc'; // rainy
    case 'thunderstorm':
      return '#818cf8'; // storm
    case 'snow':
      return '#e0f2fe'; // snowy
    case 'mist':
    case 'fog':
    case 'haze':
      return '#cbd5e1'; // foggy
    default:
      return '#f3f4f6'; // default gray
  }
};

export const getWeatherBackground = (main: string) => {
  switch (main.toLowerCase()) {
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
    case 'mist':
    case 'haze':
    case 'fog':
      return require('../assets/bg/fog.jpg');
    default:
      return require('../assets/bg/default.jpg');
  }
};