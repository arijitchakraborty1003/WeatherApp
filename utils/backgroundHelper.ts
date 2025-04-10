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