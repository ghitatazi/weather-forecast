type weatherDetails = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type forecastValue = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: weatherDetails[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type reducedForecastValue = {
  time: string;
  temp_min: number;
  temp_max: number;
  description: string;
};

export type completeForecastValue = reducedForecastValue & {
  dateStr: string;
  day: string;
  weekdayName: string;
};
