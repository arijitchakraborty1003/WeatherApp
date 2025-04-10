export const getWeatherAnimation = (weatherMain: string) => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return require('../assets/animations/sun.json');
    case 'clouds':
      return require('../assets/animations/clouds.json');
    case 'rain':
    case 'drizzle':
      return require('../assets/animations/rain.json');
    case 'thunderstorm':
      return require('../assets/animations/thunderstorm.json');
    case 'snow':
      return require('../assets/animations/snow.json');
    case 'mist':
    case 'fog':
    case 'haze':
      return require('../assets/animations/fog.json');
    default:
      return require('../assets/animations/clouds.json'); // fallback
  }
};