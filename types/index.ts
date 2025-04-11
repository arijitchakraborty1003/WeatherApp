export interface WeatherData {
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
    id: number;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}



export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

export interface ForecastResponse {
  list: ForecastItem[];
}

