export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
    id: number;
  }[];
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